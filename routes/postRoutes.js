const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');

router.post('/create', authenticateToken , postController.createPost);
router.get("/all", authenticateToken, postController.getAllPosts);

module.exports = router;