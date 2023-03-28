const jwt = require('jsonwebtoken');
require('dotenv').config()

let secret = process.env.SECRET;

module.exports = {
    createToken: (data) => {
        try {
            let token = jwt.sign(data, secret, { expiresIn: '24h' });
            return token
        } catch (error) {
            return error
        }
    },
    validateToken: (token) => {
        try {
            let data = jwt.verify(token, secret)
            return data
        } catch (error) {
            return error
        }
    }
}