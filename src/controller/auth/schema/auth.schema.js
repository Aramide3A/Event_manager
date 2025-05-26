const Joi = require("joi")


const registerUserSchema = Joi.object({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
})



const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
})


module.exports = { registerUserSchema, loginUserSchema }