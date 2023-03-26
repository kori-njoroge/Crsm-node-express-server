const express = require('express');
const { categoryRouter } = require('./routes/category-routes');
require('dotenv').config()


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/products', (req, res) => {
    res.json({ message: "Product route reached" })
})

app.use('/products/category', categoryRouter)

const port = process.env.PORT || 8010
app.listen(port, console.log(`products service on port ${port}`))