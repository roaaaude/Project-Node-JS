const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  updateBusinessStatus,
  deleteUser,
} = require('../controllers/users.controller');
const { protect, admin } = require('../middleware/auth.middleware');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.patch('/:id', protect, updateBusinessStatus);
router.delete('/:id', protect, deleteUser);

module.exports = router; 