const passport = require('passport')
const { googleCallback } = require('../controller/auth/google.controller')
const { registerUser } = require('../controller/auth/register.controller')
const { loginUser } = require('../controller/auth/login.controller')
const router = require('express').Router()

router.post('/register', registerUser)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), googleCallback)
router.post('/login', loginUser)

module.exports = router