const jwt = require('jsonwebtoken')
require('dotenv').config()

const Secret_key = process.env.SECRET_KEY

const googleCallback = (req, res) => {
    try {
        payload = {
            sub: req.user.id,
            email: req.user.email
        }
        const token = jwt.sign(payload, Secret_key)
        res.status(200).send(token)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { googleCallback }