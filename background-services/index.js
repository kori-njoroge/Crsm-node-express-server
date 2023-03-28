const express = require('express');
const { customerRouter } = require('./routes/customer-routes');
const path = require('path');
const { userRouter } = require('./routes/user-routes');

require('dotenv').config()
const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/notifications', (req, res) => {
    res.json({ message: "Back grounding" })
})
app.use('/notifications', customerRouter)
app.use('/notifications', userRouter)


const port = process.env.PORT || 7010
app.listen(port, console.log(`background services on ${port}`))