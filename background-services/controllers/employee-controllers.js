const { sendMail } = require("../services/node-mailer")

module.exports = {
    // User
    addUser: async (req, res) => {
        let data = await JSON.parse(req.headers.data)
        const { email, fullName, role } = data[0]
        const { crytoPassword } = data[1]
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: [`${email}`],
            subject: `Welcome to Cliethive`,
            template: 'nowelcome',
            context: {
                name: `${fullName}`,
                company: 'ClientHive',
                role: `${role}`,
                email: `${email}`,
                password: `${crytoPassword}`
            }
        }
        const response = await sendMail(mailOptions)
        res.status(200).json(response)
    },
    // admin new products need approval
    approveProduct: async (req, res) => {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: [`korijunior107@gmail.com`],
            subject: `New product`,
            template: 'product',
            context: {
                name: `Rick Sanches`,
                company: 'ClientHive',
                productName: 'Ringoz',
                proDescription: 'The best food to kill your teeth',
                productCategory: 'Bites and others',
                price: '$3',
                addedBy: 'Maiko'
            }
        }
        const response = await sendMail(mailOptions)
        console.log(response)
        res.status(200).json(response)
    }
}