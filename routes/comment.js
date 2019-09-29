const express = require('express')
// const auth = require('../helpers/jwt-token')
const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false });


const {
  Blog
} = require('../controllers/blog')

router.post('/comment/:postId', requireAuth, Blog.createComment);
router.get('/comment/:postId', Blog.fetchCommentsByPostId);

module.exports = router;