const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getPos = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM posg4';
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

const getPoByNo = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4
    const q = `SELECT * FROM posG4 WHERE poNoG4 = ${poNoG4}`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) return reject(err);

        // Request successful, data found
        if (data.length) {
            return res.status(200).send(data[0]); // there can only be 1, so send the explicit object
        }
        
        // Request successful, but no data
        return res.status(200).send([]);
    });
});

module.exports = {
    getPos,
    getPoByNo
}