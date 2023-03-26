const sql = require('mssql')
require('dotenv').config()

const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)

let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

module.exports = {
    // category
    createCategory: async (req, res) => {
        console.log("here we are")
        console.log(req.body)
        const { categoryName, description } = req.body
        try {
            await pool.connect()
            console.log('conected')
            let data = await pool.request()
                .input('category_name', categoryName)
                .input('description', description)
                .execute(`add_category`)
            data.rowsAffected.length && res.status(200).json({ message: `Successfully added new category: (${categoryName})  on ${date}` })
        } catch (error) {
            error.originalError.message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category ${categoryName} already exists` }) :
                res.status(400).json(error.originalError.message)
        }
    }
}