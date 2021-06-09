const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

//get all of the po lines
const getPosG4 = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT POsG4.poNoG4, POsG4.datePOG4, ClientG4.clientCompNameG4, StatusG4.statusDescriptionG4  FROM POsG4 JOIN StatusG4 ON POsG4.statusG4 = StatusG4.statusNoG4 JOIN ClientG4 ON POsG4.clientCompIdG4 = ClientG4.clientCompIdG4';
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

//get a specific PO by its id 
const getPoByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4

    // Check if the parameter provided is a valid number
    if (isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POsG4.poNoG4, POsG4.datePOG4, ClientG4.clientCompNameG4, StatusG4.statusDescriptionG4  FROM POsG4 JOIN StatusG4 ON POsG4.statusG4 = StatusG4.statusNoG4 JOIN ClientG4 ON POsG4.clientCompIdG4 = ClientG4.clientCompIdG4 WHERE poNoG4 = ${poNoG4}`;
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