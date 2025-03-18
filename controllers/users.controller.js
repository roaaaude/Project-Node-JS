const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const {
  registerValidation,
  loginValidation,
  updateUserValidation,
  updateBusinessStatusValidation,
} = require('../validation/user.validation');

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create(req.body);

    // Return user data with token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        address: user.address,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isBusiness, user.isAdmin),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    
    // Check if user exists and password matches
    if (user && (await user.matchPassword(req.body.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        address: user.address,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isBusiness, user.isAdmin),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Admin
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private
 */
const updateUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Find user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to update
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.image = req.body.image || user.image;
    user.address = req.body.address || user.address;

    // Save updated user
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      image: updatedUser.image,
      address: updatedUser.address,
      isBusiness: updatedUser.isBusiness,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update user business status
 * @route   PATCH /api/users/:id
 * @access  Private
 */
const updateBusinessStatus = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateBusinessStatusValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message) });
    }

    // Find user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to update
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    // Update business status
    user.isBusiness = req.body.isBusiness;

    // Save updated user
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      isBusiness: updatedUser.isBusiness,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res) => {
  try {
    // Find user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to delete
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this user' });
    }

    // Delete user
    await User.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  updateBusinessStatus,
  deleteUser,
}; 