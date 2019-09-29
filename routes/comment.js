const express = require('express')
// const auth = require('../helpers/jwt-token')
const router = express.Router()

const {
  createComment,
  fetchCommentsByPostId,
} = require('../controllers/blog')

router.post('/comment/:postId', createComment);
router.get('/comment/:postId', fetchCommentsByPostId);

module.exports = router;