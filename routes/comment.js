const express = require('express')
// const auth = require('../helpers/jwt-token')
const passport = require('passport')
const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


const {
  createComment,
  fetchCommentsByPostId,
  Blog
} = require('../controllers/blog')

router.post('/comment/:postId', requireAuth, requireSignin ,createComment);
router.get('/comment/:postId', fetchCommentsByPostId);

module.exports = router;