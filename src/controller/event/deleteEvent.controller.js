const prisma = require('../../utils/prisma.js');
const validateEventId = require('./schema/getEvent.Schema.js');

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is required.' });
        }

        const validateEvent = await validateEventId.validateAsync({ eventId });

        const getEvent = await prisma.event.findUnique({
            where: { id: validateEvent.eventId },
        });

        if (getEvent.organiserId !== userId) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this event.' });
        }

        await prisma.event.delete({
            where: { id: validateEvent.eventId },
        });

        return res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the event.' });
    }
}

module.exports =
    deleteEvent
    ;