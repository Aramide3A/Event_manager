const prisma = require("../../utils/prisma");

const getAllTicket = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id);

        const tickets = await prisma.ticket_Type.findMany({
            where: { eventId: eventId },
            include: {
                event: true,
                ticketHolder: true
            },
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ error: 'No tickets found' });
        }

        return res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error retrieving tickets' });
    }
}

module.exports =
    getAllTicket;
