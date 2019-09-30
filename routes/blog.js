const express = require('express')
const passport = require('passport')
// const auth = require('../helpers/jwt-token')
const router = express.Router()
const Blog = require('../controllers/blog')
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const {
//   fetchPosts,
//   createPost,
//   fetchPost,
//   allowUpdateOrDelete,
//   updatePost,
//   deletePost,
//   fetchPostByAuthorId
// } = require('../controllers/blog')

router.get('/posts', Blog.fetchPosts);
router.get('/posts/:id', Blog.fetchPost);
router.get('allow_edit_or_delete/:id', requireAuth, Blog.allowUpdateOrDelete);
router.get('/my_posts', requireAuth, Blog.fetchPostByAuthorId);
router.post('/posts', Blog.createPost);
router.put('/posts/:id', requireAuth, Blog.updatePost);
router.delete('/posts/:id', requireAuth, Blog.deletePost);

module.exports = router;