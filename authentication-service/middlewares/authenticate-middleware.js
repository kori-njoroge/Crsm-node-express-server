const { validateToken } = require("../services/jwt-token.js");

function validateJwtTokenUsers(req, res, next) {
    if (!req.headers?.authorization) {
        res.status(401).json({ message: "Authorization header is missing" });
        return 401
    } else {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodedToken = validateToken(token);
            decodedToken.message ? res.status(401).json({ message: decodedToken.message }) : next()
        } catch (error) {
            res.status(403).json(error.message)
        }
    }
}


function validateJwtTokenForeign(proxyReq, req, res, next) {
    console.log("headers", req.headers)
    if (!req.headers?.authorization) {
        res.status(401).json({ message: "Authorization header is missing" });
        return 401
    } else {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodedToken = validateToken(token);
            console.log(decodedToken)
            decodedToken.message ? res.status(401).json({ message: decodedToken.message }) : proxyReq.setHeader('X-Forwarded-For', req.ip)
            return 200
        } catch (error) {
            res.status(403).json(error.message)
        }
    }
}

module.exports = { validateJwtTokenForeign, validateJwtTokenUsers };



