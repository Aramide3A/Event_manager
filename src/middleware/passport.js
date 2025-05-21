const passport = require('passport')
const Jwt = require('../utils/passportJwt')
const googleOauth = require('../utils/passportGoogle')

console.log("Registering Google strategy");
passport.use(Jwt)
passport.use(googleOauth)

passport.serializeUser((user, done)=>{
    return done(null,user)
})
  
passport.deserializeUser((user, done)=>{
    return done(null,user)
})