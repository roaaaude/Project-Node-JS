const Card = require('../models/card.model');
const generateBizNumber = require('../utils/generateBizNumber');
const { createCardValidation, updateCardValidation } = require('../validation/card.validation');

/**
 * @desc    Get all cards
 * @route   GET /api/cards
 * @access  Public
 */
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get user's cards
 * @route   GET /api/cards/my-cards
 * @access  Private
 */
const getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.user._id });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get card by ID
 * @route   GET /api/cards/:id
 * @access  Public
 */
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (card) {
      res.json(card);
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new card
 * @route   POST /api/cards
 * @access  Private/Business
 */
const createCard = async (req, res) => {
  try {
    // Validate request body
    const { error } = createCardValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Generate unique business number
    const bizNumber = await generateBizNumber();

    // Create card
    const card = await Card.create({
      ...req.body,
      bizNumber,
      user_id: req.user._id,
    });

    if (card) {
      res.status(201).json(card);
    } else {
      res.status(400).json({ message: 'Invalid card data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update card
 * @route   PUT /api/cards/:id
 * @access  Private
 */
const updateCard = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateCardValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Find card
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if user is authorized to update
    if (card.user_id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this card' });
    }

    // Update card fields
    card.title = req.body.title || card.title;
    card.subtitle = req.body.subtitle || card.subtitle;
    card.description = req.body.description || card.description;
    card.phone = req.body.phone || card.phone;
    card.email = req.body.email || card.email;
    card.web = req.body.web || card.web;
    card.image = req.body.image || card.image;
    card.address = req.body.address || card.address;

    // Save updated card
    const updatedCard = await card.save();

    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Like/unlike card
 * @route   PATCH /api/cards/:id
 * @access  Private
 */
const likeCard = async (req, res) => {
  try {
    // Find card
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if user already liked the card
    const isLiked = card.likes.includes(req.user._id);

    if (isLiked) {
      // Unlike the card
      card.likes = card.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the card
      card.likes.push(req.user._id);
    }

    // Save updated card
    const updatedCard = await card.save();

    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete card
 * @route   DELETE /api/cards/:id
 * @access  Private
 */
const deleteCard = async (req, res) => {
  try {
    // Find card
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if user is authorized to delete
    if (card.user_id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this card' });
    }

    // Delete card
    await Card.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Card removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCards,
  getMyCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
}; 