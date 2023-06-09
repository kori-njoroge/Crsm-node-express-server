const sql = require('mssql')
const { sendMail } = require('../services/node-mailer')
require('dotenv').config()

const { config } = require('dotenv')

const pool = new sql.ConnectionPool(config)


module.exports = {
    // customer added to the system
    customerAddedMail: async (req, res) => {
        const { email, fullName } = await JSON.parse(req.headers?.data)
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: `${email}`,
            subject: 'Welcome',
            template: 'welcome',
            attachments: [{ filename: 'company logo', path: "./assets/images/logo.png" }],
            context: {
                name: `${fullName}`,
                company: 'ClientHive'
            }
        }
        let response = await sendMail(mailOptions)
        res.json(response)
    },
    purchasedCustomer: async (req, res) => {
       
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: [`korijunior107@gmail.com`, `joaninasender@gmail.com`],
            subject: `Purchase`,
            template: 'purchase',
            context: {
                name: `${'Gideon Kori'}`,
                company: 'ClientHive',
            }
        }
        const response = await sendMail(mailOptions)
        console.log(response)
        res.status(200).json(response)
    }
}