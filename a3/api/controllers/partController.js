const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

// Return all Parts
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

// Return a specific Part by partNoG4
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

// Update a specific Part specified as the partNoG4
const updatePartByNoG4 = (req, res) => new Promise((resolve, reject) => {

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameter is a valid number.
    if (isNaN(params.partNoG4) || isNaN(body.currentPriceG4) || isNaN(body.qtyG4) ||
        params.partNoG4 < 0 || body.currentPriceG4 < 0 || body.qtyG4 < 0) {
        return res.status(400).send('Bad Request - partNoG4, currentPriceG4, and qtyG4 must be positive numbers') // Return a 400 - Bad Request
    }

    // Call a stored procedure to process the update transaction.
    const q = `call PROC_PART_UPDATE_G4(${params.partNoG4}, '${body.partNameG4}', '${body.partDescriptionG4}', ${body.currentPriceG4}, ${body.qtyG4});`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err) return reject(err);

        // Send the process results to the requestor.
        return res.send(data);
    });
});

// Update the PRICE ONLY for a specific Part specified as the partNoG4
const updatePartPriceByNoG4 = (req, res) => new Promise((resolve, reject) => {

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameter is a valid number.
    if (isNaN(params.partNoG4) || isNaN(body.currentPriceG4) ||
        params.partNoG4 < 0 || body.currentPriceG4 < 0) {
        return res.status(400).send('Bad Request - partNoG4 and currentPriceG4 must be positive numbers') // Return a 400 - Bad Request
    }

    // Call a stored procedure to process the update transaction.
    const q = `call PROC_PART_PRICE_ADJUSTMENT_G4(${params.partNoG4}, ${body.currentPriceG4});`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err) return reject(err);

        // Send the process results to the requestor.
        return res.send(data);
    });
});

module.exports = {    
    getPartsG4,
    getPartByNoG4,
    updatePartByNoG4,
    updatePartPriceByNoG4
}