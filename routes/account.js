const express = require('express')
const auth = require('../helpers/jwt-token')
const router = express.Router()


const {
  addAccount, 
  login,
  loginComplete
} = require('../controllers/account')

// auth.tokenValid,

router.post('/register', addAccount)
router.post('/login', login)
router.post('/login/complete', loginComplete)
module.exports = router;