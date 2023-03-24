const express = require('express');

require('dotenv').config()
const app = express()

app.get('/notifications',(req,res) =>{
    res.json({message:"Back grounding"})
})

const port = process.env.PORT || 7010
app.listen(port, console.log(`background services on ${port}`))