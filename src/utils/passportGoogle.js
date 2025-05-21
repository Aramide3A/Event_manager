const passport = require('passport');
const  prisma  = require('./prisma');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

console.log("Registering Google strategy");

passport.use(new GoogleStrategy({
  clientID: process.env.Google_ClientID,
  clientSecret: process.env.Google_ClientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.user.findFirst({ where: { providerId: profile.id } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          provider: 'google',
          providerId: profile.id,
          email: profile.emails[0].value,
        }
      });
    }

    console.log(profile);
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
