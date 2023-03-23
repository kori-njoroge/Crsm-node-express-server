const express = require('express');

require('dotenv').config()
const app = express()



const port = process.env.PORT || 6010
app.listen(port, () => { console.log(`Auth app running on ${port}`) })