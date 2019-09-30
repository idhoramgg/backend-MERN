const express = require('express')
const passport = require('passport')
// const auth = require('../helpers/jwt-token')
const router = express.Router()
const Blog = require('../controllers/blog')
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

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
router.get('allow_edit_or_delete/:id', requireAuth, allowUpdateOrDelete);
router.get('/my_posts', requireAuth, fetchPostByAuthorId);
router.post('/posts', createPost);
router.put('/posts/:id', requireAuth, updatePost);
router.delete('/posts/:id', requireAuth, deletePost);

module.exports = router;