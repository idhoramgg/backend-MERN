const express = require('express')
// const auth = require('../helpers/jwt-token')
const passport = require('passport')
const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false });


const {
  createComment,
  fetchCommentsByPostId,
  Blog
} = require('../controllers/blog')

router.post('/comment/:postId', requireAuth, createComment);
router.get('/comment/:postId', fetchCommentsByPostId);

module.exports = router;