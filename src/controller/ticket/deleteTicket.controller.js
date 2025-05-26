const prisma = require("../../utils/prisma");

const deleteTicket = async (req, res) => {
    try {
        const ticketId = parseInt(req.params.ticketId);

        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await prisma.ticket.delete({
            where: { id: ticketId },
        });

        return res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error deleting ticket' });
    }
}

module.exports =
    deleteTicket
    ;