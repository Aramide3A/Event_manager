const router = require('express').Router()
const authenticateToken = require('../middleware/auth')
const {getAllEvents} = require('../controller/event/getAllEvent.controller')
const {getEventById} = require('../controller/event/getevent.controller')
const {createEvent} = require('../controller/event/postevent.controller')
const {updateEvent} = require('../controller/event/putevent.controller')
const {deleteEvent} = require('../controller/event/deleteevent.controller')
const {createTicket} = require('../controller/ticket/createticket.controller') 
const {getTicket} = require('../controller/ticket/getticket.controller') 
const {getAllTicket} = require('../controller/ticket/getallticket.controller') 
const {deleteTicket} = require('../controller/ticket/deleteticket.controller')
const {registerForEvent} = require('../controller/event/registerevent.controller')

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