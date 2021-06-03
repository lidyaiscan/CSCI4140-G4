const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getPartsG4 = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM PartsG4';
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

const getPartByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const partNoG4 = req.params.partNoG4

    // Check if the parameter provided is a valid number
    if (isNaN(partNoG4)) {
        return res.status(400).send('Bad Request - partNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT * FROM PartsG4 WHERE partNoG4 = ${partNoG4}`;
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
    getPartsG4,
    getPartByNoG4
}