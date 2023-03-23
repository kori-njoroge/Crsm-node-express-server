const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET


module.exports = {
    CreateToken: (data) => {
        try {
            let token = jwt.sign(data, secret, { expiresIn: '1hr' })
            return token
        } catch (error) {
            console.log(error)
            return error
        }
    },
    ValidateToken: (token) => {
        try {
            let data = jwt.verify(token, secret)
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }
}