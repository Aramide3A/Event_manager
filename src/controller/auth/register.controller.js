const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerUserSchema } = require('./schema/auth.schema')
const prisma = require('../../utils/prisma')
require('dotenv').config()

const Secret_key = process.env.SECRET_KEY

const registerUser = async (req, res) => {
    try {
        const { error, value } = registerUserSchema.validate(req.body)

        if (error) return res.status(404).json({ error: "Input error" });

        const getUser = await prisma.user.findFirst({
            where: {
                email: value.email
            }
        })
        if (getUser)
            return res.status(409).json({ error: "User already exists" });

        const hash_password = await bcrypt.hash(value.password, 10)
        const user = await prisma.user.create({
            data: {
                username: value.username,
                email: value.email,
                password: hash_password
            }
        })

        payload = {
            sub: user.id,
            email: user.email
        }
        const token = await jwt.sign(payload, Secret_key)
        res.status(200).send(token)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    registerUser
}