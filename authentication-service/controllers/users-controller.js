const sql = require('mssql');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const { config } = require('../sql-config');
const { createToken } = require('../services/jwt-token.js');

const pool = new sql.ConnectionPool(config)



module.exports = {
    //users
    addUser: async (req, res) => {
        const { fullName, phone, email, role, gender } = req.body;
        if (role.toLowerCase() === 'customer') {
            try {
                await pool.connect()
                const data = await pool.request()
                .input('full_name', fullName)
                    .input('phone', phone)
                    .input('gender', gender)
                    .input('email', email)
                    .execute(`add_customer`)
                data.rowsAffected.includes(1) && res.status(200).json({ message: "User created succesfully" })
            } catch (error) {
                if (error) {
                    res.json({ message: "User already exists" })
                }
            }
        }else{
            let crytoPassword = crypto.randomBytes(64).toString('hex').substring(0,8);
            console.log("crytoPassword",crytoPassword)
            let hash = await bcrypt.hash(crytoPassword, 8)
            try {
                await pool.connect()
                const data = await pool.request()
                    .input('full_name', fullName)
                    .input('phone', phone)
                    .input('gender', gender)
                    .input('email', email)
                    .input('role', role)
                    .input('password', hash)
                    .execute(`add_user`)
                data.rowsAffected.includes(1) && res.status(200).json({ message: "User created succesfully",crytoPassword })
            } catch (error) {
                if (error.message.includes('Violation of UNIQUE KEY constraint')) {
                    res.json({ message: "User already exists" })
                } else {
                    res.status(400).json(error.originalError['info'].message)
                }
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
            res.status(500).json({ message: "Its not you is us" })
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
                let user = data.recordset[0]
                let dbPass = data.recordset[0].password
                let result = await bcrypt.compare(password, dbPass)
                let token = createToken({ email })
                result ? res.json({ response: "Login successful", user, token }) : res.json({ response: "Check your credentials" })
            } else {
                res.status(400).json({ message: 'User not found!' })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    updateUserDetails: async (req, res) => {
        const { id, fullName, email, phone } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('user_id', id)
                .input('new_full_name', fullName)
                .input('new_email', email)
                .input('new_phone', phone)
                .execute(`update_user_det`)
            // res.json(data)
            data.rowsAffected.includes(1) ?
                res.status(200).json({ message: "User details updated successfully" })
                : res.status(400).json({ message: `User with id:{${id}} does not exist` })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    },

    //customers
    addCustomer: async (req, res) => {
        const { fullName, phone, email, gender } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('full_name', fullName)
                .input('email', email)
                .input('phone', phone)
                .input('gender', gender)
                .execute(`add_customer`)
            data.rowsAffected.length > 0 ? res.status(200).json({ message: "Customer added  successfully" }) : res.status(500).json({ message: "Request not completed try again later" })
        } catch (error) {
            res.status(400).json(error.precedingErrors.map((err, index) => `${index + 1}-> ${err.message}`));
        }
    },
    getCustomers: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_customers`)
            res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).send(error.message)
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
            !data.recordset.length ? res.status(200).json("No records found") : res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    editCustomer: async (req, res) => {
        let { id, fullName, email, phone } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('customer_id', id)
                .input('full_name', fullName)
                .input('email', email)
                .input('phone', phone)
                .execute(`update_customer`)
            data.rowsAffected.includes(1) ?
                res.status(200).json({ message: "Customer details updated successfully" })
                : res.status(400).json({ message: `customer with id:{${id}} does not exist` })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    }
}