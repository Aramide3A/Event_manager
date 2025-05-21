const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const prisma = require('./prisma')
require('dotenv').config()


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY

const Jwt = new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await prisma.user.findUnique({ where: { id: jwt_payload.id } })
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (error) {
        return done(error, false)
    }
})

module.exports = Jwt