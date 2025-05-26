const Joi = require("joi");
const prisma = require("../../../utils/prisma.js");

const validateEventId = Joi.object({
    eventId: Joi.number().required()
}).external(async (value) => {
    const event = await prisma.event.findUnique({ where: { id: value.eventId } });
    if (!event) {
        throw new Error('Event ID does not exist');
    }
});

module.exports =
    validateEventId
    ;