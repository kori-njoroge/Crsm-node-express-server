const express = require('express')


require('dotenv').config()
const app = express()


const port = process.env.PORT
app.listen(port, console.log(`products service on port ${port}`))