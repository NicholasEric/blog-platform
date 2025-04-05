const express = require('express');
const {postController, getPosts, getPostsDetails} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, postController);

router.get('/', getPosts);

router.get('/:id', getPostsDetails);

module.exports = router;