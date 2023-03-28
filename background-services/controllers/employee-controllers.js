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
    }
}