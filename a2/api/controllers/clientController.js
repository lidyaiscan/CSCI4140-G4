const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getClients = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM Client';
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) return reject(err);

        // Request successful, data found
        if (data.length) {
         return res.status(200).send(data); // send entire data array
        }

        // Request successful, no data
        return res.status(200).send([])

    });
});


module.exports = {
    getClients
}