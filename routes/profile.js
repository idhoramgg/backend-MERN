const express = require('express')
const router = express.Router()

const Profile = require('../controllers/userinfo');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/profile' ,requireAuth, Profile.fetchProfile)
router.put('/profile' ,requireAuth, Profile.updateProfile)
router.put('/password' ,requireAuth, Profile.resetPassword)

module.exports = router;