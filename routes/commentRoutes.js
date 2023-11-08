const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middleware/auth');

router.post('/create', authenticateToken, commentController.createComment);
router.put('/update/:id', authenticateToken, commentController.updateComment);
router.delete('/delete/:id', authenticateToken, commentController.deleteComment);
router.get('/post/:id', authenticateToken, commentController.getCommentsForPost);

module.exports = router;
