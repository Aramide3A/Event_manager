const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerUserSchema, loginUserSchema } = require('./schema/auth.schema')
const prisma = require('../utils/prisma')
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



const googleCallback = (req, res) => {
    try {
        payload = {
            sub: req.user.id,
            email : req.user.email
        }
        const token = jwt.sign(payload, Secret_key)
        res.status(200).send(token)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const { value, error } = loginUserSchema.validate(req.body)

        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        const getUser = await prisma.user.findUnique({ where: { email: value.email } })
        if (!getUser) {
            return res.status(400).json({error:'Invalid Login Parameters'})
        }

        const comparePassword = await bcrypt.compare(value.password, getUser.password)

        if (!comparePassword) {
            return res.status(400).json({error:'Invalid Login Parameters'})
        }
        const payload = {
            sub: getUser.id,
            email: getUser.email
        }
        const token = jwt.sign(payload, Secret_key)
        res.status(200).send(token)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}




module.exports = { registerUser, googleCallback, loginUser }