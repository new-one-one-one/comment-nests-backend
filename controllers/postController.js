const Post = require('../models/post');
const logger = require('../helpers/logger');

const createPost = async (req, res) => {
  try {
    const { title, description, imageLink } = req.body;
    const { userId } = req.user;
    
    const post = new Post({
      title,
      description,
      imageLink,
      user: userId,
    });

    await post.save();

    logger.info(`Post created by user ID: ${userId}`);
    res.status(201).json(post);
  } catch (error) {
    logger.error(`Error creating post: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createPost };
