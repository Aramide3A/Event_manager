const Joi = require("joi");

const createEventSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().iso().required(),
    duration: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(), // HH:mm format
    location: Joi.string().min(5).required(),
    eventType: Joi.string().valid('PHYSICAL', 'VIRTUAL', 'HYBRID').required(),
});

module.exports = createEventSchema ;