const prisma = require("../../utils/prisma");
const createEventSchema = require("./schema/createEvent.schema");

const createEvent = async (req, res) => {
    try {
        const userId = req.user?.sub;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is required.' });
        }

        const validatedInput = await createEventSchema.validateAsync(req.body);
        const input = {
            ...validatedInput,
            organiserId: userId,
        };

        const newEvent = await prisma.event.create({
            data: input,
        });

        return res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);

        if (error.isJoi) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: 'An error occurred while creating the event.' });
    }
};

module.exports = {
    createEvent
};
