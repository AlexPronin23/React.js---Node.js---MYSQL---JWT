const mysql2 = require('mysql2')
require('dotenv').config()

 const pool = mysql2.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    database: process.env.DATABASE_DB,
    password:process.env.DATABASE_PASSWORD
}) 

// Проверка подключения 



module.exports = pool.promise()

