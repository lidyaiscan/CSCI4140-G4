const mysql = require('mysql');
const Promise = require("bluebird");
let conn = null;

const connectDB = () => new Promise((resolve, reject) => {
    conn = mysql.createConnection({
      host: 'localhost', 
      user: 'root',      
      password: 'admin',     
      database: 'g4'
    }); 
    // conn.connect(function(err) {
    //   if (err) throw err;
    //   console.log('Database is connected successfully !');
    // });
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