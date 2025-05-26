const prisma = require('../..//utils/prisma');

const getAllEvents = async (req, res) => {
    try {
        const { eventStatus, ticketStatus, eventType } = req.query;

        const filters = {};

        if (eventStatus) {
            filters.eventStatus = eventStatus.toUpperCase(); // e.g. UPCOMING, ACTIVE, DONE
        }

        if (ticketStatus) {
            filters.ticketStatus = ticketStatus.toUpperCase(); // e.g. AVAILABLE, SOLD_OUT
        }

        if (eventType) {
            filters.eventType = eventType.toUpperCase(); // e.g. PHYSICAL, VIRTUAL, HYBRID
        }

        const events = await prisma.event.findMany({
            where: filters,
            orderBy: {
                date: 'asc',
            },
            include: {
                ticketType: true,
                attendee: true,
            },
        });

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
};

module.exports = {
    getAllEvents
};