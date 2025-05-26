const prisma = require("../../utils/prisma");

const getTicket = async (req, res) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        if (isNaN(ticketId)) {
            return res.status(400).json({ error: 'Invalid ticket ID' });
        }

        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId },
            include: {
                event: true,
            },
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error retrieving ticket' });
    }
}

module.exports = {
    getTicket,
};