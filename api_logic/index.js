const express = require('express')


require('dotenv').config()
const app = express();



const port = process.env.PORT || 5010
app.listen(port, console.log(`Gateway on port ${port}`))