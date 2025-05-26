const prisma = require('../../utils/prisma.js');
const updateEventSchema = require('./schema/updateEvent.schema.js');

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is required.' });
        }

        const validatedInput = await updateEventSchema.validateAsync(req.body);

        const getEvent = await prisma.event.findUnique({
            where: { id: parseInt(eventId) },
        });

        if (getEvent.organiserId !== userId) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this event.' });
        }

        const updatedEvent = await prisma.event.update({
            where: { id: getEvent.id },
            data: validatedInput,
        });

        return res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ error: 'An error occurred while updating the event.' });
    }
}

module.exports =
    updateEvent
    ;