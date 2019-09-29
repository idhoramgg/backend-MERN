const express = require('express')
// const auth = require('../helpers/jwt-token')
const router = express.Router()
const Authentication = require('../controllers/authentication');

// service
const passport = require('passport');
const passportService = require('../helpers/passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignin , Authentication.signin)
router.get('/verify_jwt', requireAuth, Authentication.verifyJwt)

module.exports = router;