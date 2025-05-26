const Joi = require("joi");
const prisma = require("../../../utils/prisma");

const createTicketSchema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.number().min(1).required(),
    description: Joi.string().min(10).required(),
    eventId: Joi.number().required()
}).external(async (value) => {
    const event = await prisma.event.findUnique({ where: { id: value.eventId } });
    if (!event) {
        throw new Error('Event ID does not exist');
    }
})

module.exports = createTicketSchema;