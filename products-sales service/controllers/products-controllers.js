const sql = require('mssql')
require('dotenv').config()
const { config } = require('../sql-config')
const axios = require('axios')

const pool = new sql.ConnectionPool(config)
const mailRoute = 'http://localhost:4000/notifications/'

let date = new Date
date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

module.exports = {
    // add products
    addProduct: async (req, res) => {
        const { productName, description, addedBy, price, quantity, categoryId, role, token } = req.body
        if (role.toLowerCase() === 'staff') {
            try {
                await pool.connect()
                let data = await pool.request()
                    .input('name', productName)
                    .input('description', description)
                    .input('added_by', addedBy)
                    .input('price', price)
                    .input('quantity', quantity)
                    .input('category_id', categoryId)
                    .execute(`add_product_staff`)
                if (data.rowsAffected.includes(1)) {
                    axios.post(`${mailRoute}/new-product`, req.body, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            data: JSON.stringify(req.body)
                        }
                    }).then(reply => {
                        reply.data.includes('OK') && res.status(200).json({ message: ` Successfully added new product: (${productName})  on ${date}` })
                    }).catch(err => {
                        res.status(500).json({ message: "Try again later" })
                    })
                }
            } catch (error) {
                error.originalError['info'].message.includes('Violation of UNIQUE KEY constraint') ?
                    res.status(400).json({ message: `Product {${productName}} already exists` }) :
                    res.status(400).json(error.originalError)
            }
        } else {
            try {
                await pool.connect()
                let data = await pool.request()
                    .input('name', productName)
                    .input('description', description)
                    .input('added_by', addedBy)
                    .input('price', price)
                    .input('quantity', quantity)
                    .input('category_id', categoryId)
                    .input('approved', 1)
                    .execute(`add_product_admin`)
                data.rowsAffected.length && res.status(200).json({ message: `Successfully added new product: (${productName})  on ${date}` })
            } catch (error) {
                error.originalError['info'].message.includes('Violation of UNIQUE KEY constraint') ?
                    res.status(400).json({ message: `Category {${productName}} already exists` }) :
                    res.status(400).json(error.originalError)
            }
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
                : res.status(501).json({ message: `product with id {${id}} not found` })
        } catch (error) {
            error.originalError['info']?.message.includes('Violation of UNIQUE KEY constraint') ?
                res.status(400).json({ message: `Category {${productName}} already exists` }) :
                res.status(400).json(error.originalError)
        }
    },
    getAllProducts: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_products`)
            data.recordsets.length ? res.status(200).json(data.recordsets[0])
                : res.status(501).json({ message: `Not completed try again later` })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    },
    getSingleProduct: async (req, res) => {
        const { productId } = req.params
        try {
            await pool.connect()
            let data = await pool.request()
                .input('prod_id', sql.Char(6), productId)
                .execute(`get_product_by_id`)
            data.recordset.length ? res.status(200).json(data.recordsets[0])
                : res.status(501).json({ message: `Not records found` })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    },
    deleteProduct: async (req, res) => {
        const { productId } = req.params
        try {
            await pool.connect()
            let data = await pool.request()
                .input('id', sql.Char(6), productId)
                .execute(`delete_product`)
            data.rowsAffected > 0 ? res.status(200).json({ message: `Product with id:{${productId}} deleted successfully` })
                : res.status(501).json({ message: `Not completed, try again later` })
        } catch (error) {
            res.status(400).json(error.originalError['info'].message)
        }
    }
}