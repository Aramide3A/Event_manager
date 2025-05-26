const prisma = require('../../utils/prisma.js');
const validateEventId = require('./schema/getEvent.Schema.js');

const getEventById = async (req, res) => {
    try {
        const  eventId  = req.params.id;

        const validateId = await validateEventId.validateAsync({ eventId });
        if (validateId.error) {
            return res.status(400).json({ error: validateId.error.message });
        }

        const event = await prisma.event.findUnique({
            where: { id: validateId.eventId },
            include: {
                ticketType: true,
                attendee: true,
            },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        return res.status(200).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the event.' });
    }
}

module.exports = 
    getEventById
;