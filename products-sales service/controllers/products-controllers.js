const sql = require('mssql')
require('dotenv').config()
const { config } = require('../sql-config')

const pool = new sql.ConnectionPool(config)

let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

module.exports = {
    // add products
    addProduct: async (req, res) => {
        const { productName, description, addedBy, price, itemsAdded, categoryId } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('name', productName)
                .input('description', description)
                .input('added_by', addedBy)
                .input('price', price)
                .input('quantity', itemsAdded)
                .input('category_id', categoryId)
                .execute(`add_product`)
            console.log(data)
            data.rowsAffected.length && res.status(200).json({ message: `Successfully added new product: (${productName})  on ${date}` })
        } catch (error) {
            error.originalError['info'].message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category {${productName}} already exists` }) :
                res.status(400).json(error.originalError)
        }
    },
    updateProduct: async (req, res) => {
        const { id, productName, description, updatedBy, approved, quantity, price } = req.body
        try {
            await pool.connect()
            let data = await pool.request()
                .input('id', id)
                .input('name', productName)
                .input('description', description)
                .input('updated_by', updatedBy)
                .input('quantity', quantity)
                .input('price', price)
                .input('approved', approved)
                .execute(`update_product`)
            data.rowsAffected > 0 ? res.status(200).json({ message: `Details for:(${id}) updated successfully  on ${date}` })
            :res.status(501).json({message:`product with id {${id}} not found`})
        } catch (error) {
            error.originalError['info']?.message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category {${productName}} already exists` }) :
                res.status(400).json(error.originalError)
        }
    }
}