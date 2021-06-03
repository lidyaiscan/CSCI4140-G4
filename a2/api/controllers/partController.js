const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getPartByNo = (req, res) => new Promise((resolve, reject) => {
    const partNoG4 = req.params.partNoG4
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
    getPartByNo
}