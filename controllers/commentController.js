const Comment = require('../models/comment');
const logger = require('../helpers/logger');
const jwt = require('jsonwebtoken');

const createComment = async (req, res) => {
  try {

    const { text, user, post, parentComment } = req.body;

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);    

    console.log({
      text, user, post, parentComment
   })

    const comment = new Comment({
      text,
      user: decoded.userId,
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

const getCommentsForPost = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      const comments = await Comment.find({
        post: postId,
        parentComment: null, 
      }).populate('user', 'email'); 
  
      const populateReplies = async (comment) => {
        if (comment.replies && comment.replies.length > 0) {
          const populatedReplies = await Comment.populate(comment.replies, {
            path: 'user',
            select: 'email',
          });
  
          comment.replies = populatedReplies;
  
          for (const reply of comment.replies) {
            await populateReplies(reply);
          }
        }
      };
  
      for (const comment of comments) {
        await populateReplies(comment);
      }
  
      logger.info(`Retrieved comments for post ID: ${postId}`);
      res.status(200).json(comments);
    } catch (error) {
      logger.error(`Error retrieving comments: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { 
    createComment, 
    updateComment, 
    deleteComment,
    getCommentsForPost 
};
