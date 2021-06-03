const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getPosG4 = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM POsG4';
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

const getPoByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4

    // Check if the parameter provided is a valid number
    if (isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT * FROM POsG4 WHERE poNoG4 = ${poNoG4}`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) return reject(err);

        // Request successful, data found
        if (data.length) {
            return res.status(200).send(data[0]);
        }
        
        // Request successful, but no data
        return res.status(200).send([]);
    });
});

module.exports = {
    getPosG4,
    getPoByNoG4
}