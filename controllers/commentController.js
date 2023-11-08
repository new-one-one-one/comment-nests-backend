const Comment = require('../models/comment');
const logger = require('../helpers/logger');

const createComment = async (req, res) => {
  try {
    const { text, user, post, parentComment } = req.body;

    console.log({
        text, user, post, parentComment
    })
    const comment = new Comment({
      text,
      user,
      post,
      parentComment,
    });

    await comment.save();

    logger.info(`Comment created by user ID: ${user} on post ID: ${post}`);
    res.status(201).json(comment);
  } catch (error) {
    logger.error(`Error creating comment: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { text } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text, updatedAt: Date.now() },
      { new: true }
    );

    if (!comment) {
      logger.error(`Comment not found: ${commentId}`);
      return res.status(404).json({ error: 'Comment not found' });
    }

    logger.info(`Comment updated by user ID: ${comment.user} on post ID: ${comment.post}`);
    res.status(200).json(comment);
  } catch (error) {
    logger.error(`Error updating comment: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      logger.error(`Comment not found: ${commentId}`);
      return res.status(404).json({ error: 'Comment not found' });
    }

    logger.info(`Comment deleted by user ID: ${comment.user} on post ID: ${comment.post}`);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    logger.error(`Error deleting comment: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createComment, updateComment, deleteComment };
