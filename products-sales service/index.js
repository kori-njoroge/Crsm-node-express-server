const express = require('express')
require('dotenv').config()


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/products', (req, res) =>{
    console.log((" welcome first"))
    res.json({message:"Product route reached"})
})

const port = process.env.PORT || 8010
app.listen(port, console.log(`products service on port ${port}`))