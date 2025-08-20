const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          
  password: '@Amor170803', 
  database: 'geladeira'
});

module.exports = pool.promise();