const express = require('express')
const passport = require('passport')
const authRouter = require('./src/routes/auth.routes')
const eventRouter = require('./src/routes/event.routes')
const cors = require('cors');
require('dotenv').config()
require('./src/utils/passportGoogle')
require('./src/utils/passportJwt')


const app = express()
app.use(cors());
app.use(passport.initialize())
app.use(express.json())


app.use('/auth', authRouter)
app.use('/event', eventRouter)

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})