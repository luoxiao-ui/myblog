const db = require('./db.js');
const mysql = require('mysql');

const config = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port
});

config.connect();

module.exports = config;