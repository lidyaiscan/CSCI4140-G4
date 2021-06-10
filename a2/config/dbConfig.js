const mysql = require('mysql');
const Promise = require("bluebird");
let conn = null;

const connectDB = () => new Promise((resolve, reject) => {
    conn = mysql.createConnection({
      host: 'db.cs.dal.ca',
      user: 'yifanw',
      password: 'B00791285',
      database: 'yifanw'
    });

    conn.connect((err) => {
        if (err) return reject(err);
        console.log('Database is connected successfully !');
        return resolve();
    });
});

const getDB = () => {
    return conn;
}

module.exports = {
    connectDB: connectDB,
    getDB: getDB
};