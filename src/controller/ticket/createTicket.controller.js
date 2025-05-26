const { connect } = require("../../routes/event.routes");
const prisma = require("../../utils/prisma");
const createTicketSchema = require("./schema/createTicket.schema");

const createTicket = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, amount, description } = req.body;

        const validatedInput = await createTicketSchema.validateAsync({ name, amount, description, eventId });

        const ticket = await prisma.ticket_Type.create({
            data: {
                name: validatedInput.name,
                amount: validatedInput.amount,
                available: validatedInput.amount,
                description: validatedInput.description,
                event: {
                    connect: {
                        id: parseInt(validatedInput.eventId),
                    },
                },
            },
        });


        await prisma.event.update({
            where: { id: parseInt(validatedInput.eventId) },
            data: {
                totalTickets: {
                    increment: amount
                }
            }
        });

        return res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating tickets' });
    }
}

module.exports = {
    createTicket,
};