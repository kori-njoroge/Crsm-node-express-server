const express = require('express')
require('dotenv').config()


const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');



// Rules for routing requests to microservices
const salesProxy = createProxyMiddleware('/sales', { target: 'http://localhost:3001' });
const usersProxy = createProxyMiddleware('/users', { target: 'http://localhost:3002' });
const productsProxy = createProxyMiddleware('/products', { target: 'http://localhost:8000' });

// Use the proxy middleware to forward requests to the appropriate microservice
app.use(salesProxy);
app.use(usersProxy);
app.use(productsProxy);



const port = process.env.PORT || 5010
app.listen(port, console.log(`Gateway listening on port ${port}`))