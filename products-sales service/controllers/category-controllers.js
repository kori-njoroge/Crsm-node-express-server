const sql = require('mssql')
require('dotenv').config()

const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)

let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

module.exports = {
    // category
    createCategory: async (req, res) => {
        const { categoryName, description, addedBy, updatedBy } = req.body
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
            let data = await pool.request().execute(`get_categories`)
            res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).json({ message: "Its not you its us" })
        }
    },
    getSingleCategory: async (req, res) => {
        const { catId } = req.params
        try {
            await pool.connect()
            let data = await pool.request()
                .input('category_id', sql.Char(6), catId)
                .execute(`get_category_by_id`)
            !data.recordset.length ? res.status(400).json({ message: "No records found" })
                : res.status(200).json(data.recordset)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    },
    updateCategoryDetails: async (req, res) => {
        const { catId, categoryName, description, updatedBy } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('category_id', sql.Char(6), catId)
                .input('category_name', categoryName)
                .input('category_dec', description)
                .input('updated_by', updatedBy)
                .execute(`update_category`)
            if (data.rowsAffected > 0) res.status(200).json({ message: `Details for {${catId}} updated successfully on ${date}}` })
            else res.status(501).json({ message: "Failed to update,try again later" })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    },
    deleteCategory: async (req, res) => {
        const { catId } = req.params
        try {
            await pool.connect()
            let data = await pool.request()
                .input('category_id', sql.Char(6), catId)
                .execute(`delete_category`)
            if (data.rowsAffected > 0) res.status(200).json({ message: `Category with id: {${catId}} successfully deleted ` })
            else res.status(501).json({ message: "Failed to delete,try again later" })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    }
}