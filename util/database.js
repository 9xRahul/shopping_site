const sql = require('mysql2')
const pool = sql.createPool({ host: "localhost", user: "root", database: "nodejs", password: 'root@123' })

module.exports = pool.promise()