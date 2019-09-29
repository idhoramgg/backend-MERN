const express = require('express')
// const auth = require('../helpers/jwt-token')
const router = express.Router()

const {
  fetchPosts,
  createPost,
  fetchPost,
  allowUpdateOrDelete,
  updatePost,
  deletePost,
  fetchPostByAuthorId
} = require('../controllers/blog')

router.get('/posts', fetchPosts);
router.get('/posts/:id', fetchPost);
router.get('allow_edit_or_delete/:id', allowUpdateOrDelete);
router.get('/my_posts', fetchPostByAuthorId);
router.post('/posts/new', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;