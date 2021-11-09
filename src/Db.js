const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test'
});


module.exports = { connection }