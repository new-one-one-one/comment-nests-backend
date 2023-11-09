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

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'email'); // Populate the 'user' field with 'email' property
    res.json(posts);
    logger.info("Retrieve all posts")
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createPost, getAllPosts };
