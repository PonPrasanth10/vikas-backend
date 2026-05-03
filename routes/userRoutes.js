const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/admin/users', protect, adminOnly, getAllUsers);
router.put('/admin/users/:id', protect, adminOnly, updateUser);
router.delete('/admin/users/:id', protect, adminOnly, deleteUser);

module.exports = router;
