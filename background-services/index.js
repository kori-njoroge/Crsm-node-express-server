const express = require('express');

require('dotenv').config()
const app = express()

const port = process.env.PORT || 7010
app.listen(port, console.log(`background services on ${port}`))