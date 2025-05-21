const passport = require('passport')
const { googleCallback, registerUser, loginUser } = require('../controller/auth.controller')
const router = require('express').Router()

router.post('/register', registerUser)
router.get('/google', passport.authenticate('google', {scope: ['profile','email'], session: false}))
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/',  session: false }), googleCallback)
router.post('/login',loginUser)

module.exports = router