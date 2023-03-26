const sql = require('mssql')
require('dotenv').config()

const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)

let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

module.exports = {
    // category
    createCategory: async (req, res) => {
        const { categoryName, description, addedBy } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('category_name', categoryName)
                .input('description', description)
                .input('added_by', addedBy)
                .execute(`add_category`)
            data.rowsAffected.length && res.status(200).json({ message: `Successfully added new category: (${categoryName})  on ${date}` })
        } catch (error) {
            error.originalError.message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category {${categoryName}} already exists` }) :
                res.status(400).json(error.originalError)
        }
    },
    getAllCategories: async (req, res) => {
        try {
            await pool.connect()
            console.log('conected')
            let data = await pool.request().execute(`get_categories`)
            res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).json({ message: "Its not you its us" })
        }
    },
    getSingleCategory: async (req, res) => {
        console.log(req.params)
        const { catId } = req.params
        let id = `'${catId}'`
        console.log(id)
        try {
            await pool.connect()
            let data = await pool.request()
                .input('category_id', sql.Char(6), catId)
                .execute(`get_category_by_id`)
            console.log(data)
            !data.recordset.length ? res.status(400).json({ message: "No records found" })
                : res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}