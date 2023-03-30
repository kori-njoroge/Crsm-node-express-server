const sql = require('mssql')
require('dotenv').config()
const { config } = require('../sql-config')


const pool = new sql.ConnectionPool(config)

module.exports = {
    // get count of tables
    getCountForAll: async (req, res) => {
        console.log('kumefikwo hapa report')
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_count_all`)
            res.json(data.recordsets)
        } catch (error) {
            res.json(error)
        }
    },
    getTopCustomers:async(req,res) =>{
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_top_customers`)
            console.log(data)
        } catch (error) {
            
        }
    }
}