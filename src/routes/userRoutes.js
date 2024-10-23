const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById,
  getCacheStats 
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/stats', getCacheStats);
router.get('/:id', getUserById);

module.exports = router;