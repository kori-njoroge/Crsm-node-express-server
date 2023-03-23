const express = require('express');
const { userRouter } = require('./routes/user-routes');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.use('/users', userRouter)

app.get('/users/home', (req, res) => {
    res.json({ message: 'Welcome Dawg' })
})


const port = process.env.PORT || 4010
app.listen(port, () => { console.log(`Users service on ${port}`) })