const prisma = require("../../utils/prisma");

const registerForEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const ticketId = parseInt(req.params.ticketId);
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is required.' });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        const ticketType = await prisma.ticket_Type.findUnique({
            where: { id: ticketId },
        });

        if (!ticketType || ticketType.eventId !== eventId) {
            return res.status(404).json({ error: 'Ticket type not found.' });
        }

        if (ticketType.available <= 0 || ticketType.status === 'SOLD_OUT') {
            return res.status(400).json({ error: 'Ticket type is not available.' });
        }

        const existingRegistration = await prisma.ticket_Holder.findFirst({
            where: {
                eventId: eventId,
                userId: userId,
            },
        });

        if (existingRegistration) {
            return res.status(400).json({ error: 'User is already registered for this event.' });
        }

        // Register the user for the event
        const registration = await prisma.ticket_Holder.create({
            data: {
                event: {
                    connect: { id: eventId },
                },
                user: {
                    connect: { id: userId },
                },
                ticketType: {
                    connect: { id: ticketId },
                },
            },
        });


        const updateTicket = await prisma.ticket_Type.update({
            where: { id: ticketId },
            data: {
                available: {
                    decrement: 1,
                },
            },
        });
        if (updateTicket.available <= 0) {
            await prisma.ticket_Type.update({
                where: { id: ticketId },
                data: {
                    status: 'SOLD_OUT',
                },
            });
        }

        const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: {
                totalTickets: {
                    decrement: 1,
                },
            },
        });
        if (updatedEvent.totalTickets <= 0) {
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    status: 'SOLD_OUT',
                },
            });
        }

        return res.status(201).json(registration);
    } catch (error) {
        console.error('Error registering for event:', error);
        return res.status(500).json({ error: 'An error occurred while registering for the event.' });
    }
}

module.exports = {
    registerForEvent,
};