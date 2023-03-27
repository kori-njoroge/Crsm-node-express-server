const sql = require('mssql')
require('dotenv').config()

const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)
let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`



module.exports = {
    addSale: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request()
            .input()
            .input()
            .input()
            .input()
            .input()
            .execute(``)
            console.log(data)
            data.rowsAffected.length && res.status(200).json({ message: `Successfully added new product: (${productName})  on ${date}` })
        } catch (error) {
            console.log(error)      
            error.originalError['info'].message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category {${productName}} already exists` }) :
                res.status(400).json(error.originalError)
        }
    }
}