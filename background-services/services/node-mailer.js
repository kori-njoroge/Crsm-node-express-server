const nodemailer = require('nodemailer')
require('dotenv').config()
const path = require('path')
const hbs = require('nodemailer-express-handlebars')


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PWD
    }
})

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions))

module.exports = {
    sendMail: async (mailOptions) => {
        let response = await transporter.sendMail(mailOptions)
        return response.response
    }
}