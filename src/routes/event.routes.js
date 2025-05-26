const router = require('express').Router()
const {  deleteEvent } = require('../controller/event/deleteEvent.controller')
const {  getAllEvents } = require('../controller/event/getAllEvent.controller')
const {  getEventById } = require('../controller/event/getEvent.controller')
const {  createEvent } = require('../controller/event/postevent.controller')
const {  updateEvent } = require('../controller/event/putEvent.controller')
const authenticateToken = require('../middleware/auth')


router.get('', authenticateToken, getAllEvents)
router.get('/:id', authenticateToken, getEventById)
router.post('', authenticateToken, createEvent)
router.put('/:id', authenticateToken, updateEvent)
router.delete('/:id', authenticateToken, deleteEvent)



module.exports = router