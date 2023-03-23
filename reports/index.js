const express = require('express')

require('dotenv').config()
const app = express()


const port = process.env.PORT || 9010
app.listen(port,()=>{console.log(`Reports app on port ${port}`)})