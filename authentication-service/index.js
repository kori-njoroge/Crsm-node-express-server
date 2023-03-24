const express = require('express');
const { userRouter } = require('./routes/user-routes');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



const { createProxyMiddleware } = require('http-proxy-middleware');


// Rules for routing requests to microservices
const productsProxy = createProxyMiddleware('/products',{ target: 'http://localhost:8000' });
const notifyProxy = createProxyMiddleware('/notifications', { target: 'http://localhost:7000' });



// Use the proxy middleware to forward requests to the appropriate microservice
app.use(productsProxy);
app.use(notifyProxy);



app.use('/users', userRouter)

app.get('/users/home', (req, res) => {
    res.json({ message: 'Welcome Dawg' })
})


const port = process.env.PORT || 4010
app.listen(port, () => { console.log(`Users service on ${port}`) })