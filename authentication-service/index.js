const express = require('express');
const { userRouter } = require('./routes/user-routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { validateJwtTokenForeign } = require('./middlewares/authenticate-middleware');
require('dotenv').config()


const app = express();

var restream = function (proxyReq, req, res, options) {
    console.log(req.body)
    let valid = validateJwtTokenForeign(proxyReq, req, res)
    console.log("validity", valid)
    if (valid === true) {
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }else{
            proxyReq.setHeader('X-Forwarded-For', req.ip)
        }
    } else if (valid === 401) {
        res.status(401).json({ message: "Authorization header is missing" });
    } else {
        res.status(401).json({ message: valid })
    }
}


// Rules for routing requests to microservices
const productsProxy = createProxyMiddleware('/products',
    {
        target: 'http://localhost:8000',
        onProxyReq: restream
    })

const notifyProxy = createProxyMiddleware('/notifications', {
    target: 'http://localhost:7000',
    onProxyReq: (proxyReq, req, res, next) => {
        validateJwtTokenForeign(proxyReq, req, res, next)
    }
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Use the proxy middleware to forward requests to the appropriate microservice
app.use(productsProxy);
app.use(notifyProxy);


app.get('/users/home', (req, res) => {
    res.json({ message: 'Welcome Dawg' })
})

app.use('/users', userRouter)

const port = process.env.PORT || 4010
app.listen(port, () => { console.log(`Users service on ${port}`) })