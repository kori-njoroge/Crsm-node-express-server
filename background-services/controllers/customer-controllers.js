const { sendMail } = require('../services/node-mailer')
require('dotenv').config()


module.exports = {
    // customer added to the system
    customerAddedMail: async (req, res) => {
        // const {email,fullName} = req.body
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: 'korijunior106@gmail.com',
            subject: 'Welcome',
            template: 'welcome',
            attachments:[{filename:'company logo',path: "./assets/images/logo.png"}],
            context:{
                name:'Gideon',
                company:'ClientHive'
            }
        }
        let response = await sendMail(mailOptions)
        console.log(response)
        res.json(response)
    }
}