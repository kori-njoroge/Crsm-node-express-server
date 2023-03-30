const sql = require('mssql')
require('dotenv').config()
const { config } = require('../sql-config')


const pool = new sql.ConnectionPool(config)

module.exports = {
    // get count of tables
    getCountForAll: async (req, res) => {
        try {
            await pool.connect()
            let data = await pool.request().execute(`get_count_all`)
            console.log(data)
        } catch (error) {
            console.log(data)
        }
    }
}