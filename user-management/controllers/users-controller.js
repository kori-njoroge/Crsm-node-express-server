const sql = require('mssql');
const bcrypt = require('bcrypt');

const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)



module.exports = {
    //users
    addUser: async (req, res) => {
        const { fullName, phone, email, password, role } = req.body;
        let hash = await bcrypt.hash(password, 8)
        console.log(hash)
        try {
            await pool.connect()
            const data = await pool.request()
                .input('full_name', fullName)
                .input('phone', phone)
                .input('email', email)
                .input('role', role)
                .input('password', hash)
                .execute(`add_user`)
            console.log(data)
            res.json(data.rowsAffected)
        } catch (error) {
            res.json(error.message)
            console.log(error)
        }
    },
    getAllUsers: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_users`)
            res.json(data.recordset)
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            await pool.connect()
            let data = await pool.request()
                .input('email', email)
                .execute(`get_single_users`)
            if (data.recordset.length) {
                let dbPass = data.recordset[0].password
                let result = await bcrypt.compare(password, dbPass)
                console.log(result)
                result ? res.json({ response: "Login successful" }) : res.json({ response: "Check your credentials" })
            } else {
                res.json({ message: 'User not found!' })
            }
        } catch (error) {
            res.json(error.message)
        }
    },

    //customers
    addCustomer: async (req, res) => {
        console.log("first")
        const { fullName, phone, email } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('full_name',fullName)
                .input('email',email)
                .input('phone',phone)
                .execute(`add_customer`)
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }
}