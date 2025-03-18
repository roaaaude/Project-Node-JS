const express = require('express');
const router = express.Router();
const {
  getCards,
  getMyCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
} = require('../controllers/cards.controller');
const { protect, business } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getCards);

// Protected routes
router.get('/my-cards', protect, getMyCards);
router.post('/', protect, business, createCard);

// Card by ID routes (must be after specific routes to avoid conflicts)
router.get('/:id', getCardById);
router.put('/:id', protect, updateCard);
router.patch('/:id', protect, likeCard);
router.delete('/:id', protect, deleteCard);

module.exports = router; 