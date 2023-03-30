const sql = require('mssql')

const { sendMail } = require("../services/node-mailer")
const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)

module.exports = {
    // User
    addUser: async (req, res) => {
        let data = await JSON.parse(req.headers.data)
        const { email, fullName, role } = data[0]
        const { crytoPassword } = data[1]
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: [`${email}`],
            subject: `Welcome to ClientHive`,
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
        const { productName, description, addedBy, categoryId, price } = JSON.parse(req.headers?.data)
        try {
            await pool.connect()
            let data = await pool.request()
                .input('user_id', addedBy)
                .execute(`get_user_by_id`)
            data = data?.recordset[0]?.full_name
            let category = await pool.request()
                .input('category_id', sql.Char(6), categoryId)
                .execute(`get_category_by_id`)
            category = category?.recordset[0]?.name
            const mailList = (await pool.request().execute(`get_employees`))?.recordset
            const emails = mailList.map(item => item.email)
            console.log("mail", emails)
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: emails,
                subject: `New product`,
                template: 'product',
                context: {
                    name: `User`,
                    company: 'ClientHive',
                    productName: `${productName}`,
                    proDescription: `${description}`,
                    productCategory: `${category}`,
                    price: `$${price}`,
                    addedBy: `${data}`
                }
            }
            const response = await sendMail(mailOptions)
            console.log(response)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    approveCategory:async(req,res) =>{
        console.log(JSON.parse(req.headers.data))
        const { categoryName, description, addedBy} = JSON.parse(req.headers?.data)
        try {
            await pool.connect()
            let data = await pool.request()
                .input('user_id', addedBy)
                .execute(`get_user_by_id`)
            data = data?.recordset[0]?.full_name
            const mailList = (await pool.request().execute(`get_employees`))?.recordset
            const emails = mailList.map(item => item.email)
            console.log("mail", data)
            console.log("email", emails)
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: emails,
                subject: `New Category`,
                template: 'category',
                context: {
                    name: `User`,
                    company: 'ClientHive',
                    categoryName: `${categoryName}`,
                    catDescription: `${description}`,
                    addedBy: `${data}`
                }
            }
            const response = await sendMail(mailOptions)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}