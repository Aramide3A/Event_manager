const Joi = require("joi");

const updateEventSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().min(10).optional(),
    date: Joi.date().iso().optional(),
    duration: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(), // HH:mm format
    location: Joi.string().min(3).optional(),
    eventType: Joi.string().valid('PHYSICAL', 'VIRTUAL', 'HYBRID').optional(),
});

module.exports = updateEventSchema ;