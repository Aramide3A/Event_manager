const router = require('express').Router()
const authenticateToken = require('../middleware/auth')

// Route to see all events
router.get('/events', authenticateToken, async (req, res) => {
    try {
        const events = await pool.query('SELECT * FROM event')
        res.send(events.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// Route to see a particular events
router.get('/events/:id', authenticateToken, async (req, res) => {
    try {
        const event_id = req.params.id
        const events = await pool.query('SELECT * FROM event WHERE id = ($1)', [event_id])
        res.send(events.rows[0])
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// Route to create new event
router.post('/events', authenticateToken, async (req, res) => {
    try {
        const { name, host, venue, capacity, event_date, start_at, end_at } = req.body
        const events = await pool.query('INSERT INTO event(name, host, venue, capacity,event_date, start_at, end_at) values($1,$2,$3,$4,$5,$6,$7) RETURNING *', [name, host, venue, capacity, event_date, start_at, end_at])
        res.status(200).send('Event Created Successfully')
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

//Route to update event
router.put('/events/:id', authenticateToken, async (req, res) => {
    try {
        const event_id = req.params.id
        const { name, host, venue, capacity, event_date, start_at, end_at } = req.body
        const update_task = await pool.query('UPDATE event SET name = ($2),host= ($3), venue= ($4), capacity= ($5),event_date= ($6), start_at= ($7), end_at= ($8) WHERE id = ($1) RETURNING *', [event_id, name, host, venue, capacity, event_date, start_at, end_at])
        res.status(200).send('Event Updated Successfully')
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

//Route to delete event
router.delete('/events/:id', authenticateToken, async (req, res) => {
    try {
        const event_id = req.params.id
        const update_task = await pool.query('DELETE FROM event WHERE id = ($1)', [event_id])
        res.status(200).send('Event Deleted Successfully')
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

//Route to register for event
router.post('/events/:id/register', authenticateToken, async (req, res) => {
    const event_id = req.params.id
    const { name, phone, email } = req.body
    try {
        const new_event = await pool.query('INSERT INTO attendees(event,name,phone,email) values($1,$2,$3,$4) RETURNING * ', [event_id, name, phone, email])
        const attendee_count = await pool.query('SELECT * FROM attendees WHERE event = ($1) ', [event_id])
        // res.status(200).json(attendee_count.rowCount)
        const update_event = await pool.query('UPDATE event SET no_attendees=($1) WHERE id = ($2) ', [attendee_count.rowCount, event_id])
        res.send('You have successfully registered for this event')
    } catch (error) {
        return res.json(error.message).status(500)
    }
})

// //Route to cancel registration for event
// router.delete('/events/:id/register', async(req,res)=>{
//     const event_id = req.params.id
//     try {
//         const new_event = await pool.query('DELETE * FROM attendees WHERE event = ($1)', [event_id])
//         const attendee_count = await pool.query('SELECT * FROM attendees WHERE event = ($1) ',[event_id])
//         const update_event = await pool.query('UPDATE event SET no_attendees=($1) WHERE id = ($2) ',[attendee_count.rowCount,event_id])
//         res.send('You have successfully registered for this event')
//     } catch (error) {
//         return res.json(error.message).status(500)
//     }
// })

module.exports = router