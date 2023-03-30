const express = require('express');
const cors = require('cors')
const { categoryRouter } = require('./routes/category-routes');
const { productsRouter } = require('./routes/products-routes');
const { salesRouter } = require('./routes/sales-routes');
const { reportsRouter } = require('./routes/reports-routes');
require('dotenv').config()


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.get('/products', (req, res) => {
    res.json({ message: "Product route reached" })
})

app.use('/products', productsRouter)
app.use('/products/category', categoryRouter)
app.use('/products/sales', salesRouter)
app.use('/products/reports', reportsRouter)

const port = process.env.PORT || 8010
app.listen(port, console.log(`products service on port ${port}`))