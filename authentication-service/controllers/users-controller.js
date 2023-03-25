const sql = require('mssql');
const bcrypt = require('bcrypt');

const { config } = require('../sql-config');
const { createToken } = require('../services/jwt-token.js');

const pool = new sql.ConnectionPool(config)



module.exports = {
    //users
    addUser: async (req, res) => {
        const { fullName, phone, email, password, role,gender } = req.body;
        let hash = await bcrypt.hash(password, 8)
        try {
            await pool.connect()
            const data = await pool.request()
                .input('full_name', fullName)
                .input('phone', phone)
                .input('gender',gender)
                .input('email', email)
                .input('role', role)
                .input('password', hash)
                .execute(`add_user`)

            res.json(data.rowsAffected)
        } catch (error) {
            if (error.message.includes('Violation of UNIQUE KEY constraint')) {
                res.json({ message: "User already exists" })

            } else {
                res.json(error.message)

            }
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
                let token = createToken({email})
                result ? res.json({ response: "Login successful", token }) : res.json({ response: "Check your credentials" })
            } else {
                res.json({ message: 'User not found!' })
            }
        } catch (error) {
            res.json(error.message)
        }
    },

    //customers
    addCustomer: async (req, res) => {
        const { fullName, phone, email,gender } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('full_name', fullName)
                .input('email', email)
                .input('phone', phone)
                .input('gender', gender)
                .execute(`add_customer`)
            res.json(data.recordset)
        } catch (error) {
            res.status(400).json(error.precedingErrors.map((err,index) => `${index+1}-> ${err.message}`));
        }
    },
    getCustomers: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_customers`)
            res.json(data.recordset)
        } catch (error) {
            res.send(error.message)
        }
    },
    singleCustomer: async (req, res) => {
        const { phone } = req.body
        try {
            await pool.connect();
            let data = await pool.request()
                .input('phone', phone)
                .execute(`get_single_customer`)
                console.log(data)
            !data.recordset.length ? res.json("No records found") : res.json(data.recordset)
        } catch (error) {
            res.json(error.message)
        }
    },
    editCustomer: async (req, res) => {
        console.log('data')
        let { id, fullName, email, phone } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('customer_id', id)
                .input('new_full_name', fullName)
                .input('new_email', email)
                .input('new_phone', phone)
                .execute(`update_customer`)
            data.rowsAffected > 0 ? res.json({ message: "Customer details updated successfully" }) : res.json({ message: "Request not completed try again later" })

        } catch (error) {
            res.json(error)
        }
    }
}