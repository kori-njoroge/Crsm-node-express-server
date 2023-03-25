const express = require('express');
const { userRouter } = require('./routes/user-routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { validateJwtTokenForeign } = require('./middlewares/authenticate-middleware');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());





// Rules for routing requests to microservices
const productsProxy = createProxyMiddleware('/products',
    {
        target: 'http://localhost:8000',
        onProxyReq: (proxyReq, req, res, next) => {
            validateJwtTokenForeign(proxyReq, req, res, next)
        }
    })

const notifyProxy = createProxyMiddleware('/notifications', {
    target: 'http://localhost:7000',
    onProxyReq: (proxyReq, req, res, next) => {
        validateJwtTokenForeign(proxyReq, req, res, next)
    }
})

// Use the proxy middleware to forward requests to the appropriate microservice
app.use(productsProxy);
app.use(notifyProxy);


app.get('/users/home', (req, res) => {
    res.json({ message: 'Welcome Dawg' })
})

app.use('/users', userRouter)

const port = process.env.PORT || 4010
app.listen(port, () => { console.log(`Users service on ${port}`) })