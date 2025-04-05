const Post = require('../models/Post');

exports.postController = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const post = new Post({ title, content, tags, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'username');
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

exports.getPostsDetails = async (req, res) => {
  try {
    const postId = req.params.id;
    const posts = await Post.findById(postId).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}