const router = require('express').Router()
const { deleteEvent } = require('../controller/event/deleteEvent.controller')
const { getAllEvents } = require('../controller/event/getAllEvent.controller')
const { getEventById } = require('../controller/event/getEvent.controller')
const { createEvent } = require('../controller/event/postevent.controller')
const { updateEvent } = require('../controller/event/putEvent.controller')
const { registerForEvent } = require('../controller/event/registerEvent.controller')
const { createTicket } = require('../controller/ticket/createTicket.controller')
const { deleteTicket } = require('../controller/ticket/deleteTicket.controller')
const { getAllTicket } = require('../controller/ticket/getAllTicket.controller')
const { getTicket } = require('../controller/ticket/getTicket.controller')
const authenticateToken = require('../middleware/auth')


router.get('', authenticateToken, getAllEvents)
router.get('/:id', authenticateToken, getEventById)
router.post('', authenticateToken, createEvent)
router.put('/:id', authenticateToken, updateEvent)
router.delete('/:id', authenticateToken, deleteEvent)

//ticket routes
router.post('/:id/ticket', authenticateToken, createTicket)
router.get('/ticket/:ticketId', authenticateToken, getTicket)
router.get('/:id/ticket', authenticateToken, getAllTicket)
router.delete('/ticket/:ticketId', authenticateToken, deleteTicket)

router.post('/:eventId/ticket/:ticketId/register', authenticateToken, registerForEvent)



module.exports = router