const express = require('express')
const passport = require('passport')
const authRouter = require('./src/routes/auth.routes')
const eventRouter = require('./src/routes/register.routes')
require('dotenv').config()
require('./src/utils/passportGoogle')
require('./src/utils/passportJwt')
const cors = require('cors');

app.use(cors());
const app = express()
app.use(passport.initialize())
app.use(express.json())


app.use('/auth', authRouter)

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})