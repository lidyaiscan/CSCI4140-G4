const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getClientsG4 = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM ClientG4';
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

// Return specific client by client clientCompIdG4
const getClientByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const clientCompIdG4 = req.params.clientCompIdG4

    // Check if the parameter provided is a valid number
    if (isNaN(clientCompIdG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT * FROM ClientG4 WHERE clientCompIdG4 = ${clientCompIdG4}`;
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

const updateClient = (req, res) => new Promise((resolve, reject) => {

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameter is a valid.
    if (isNaN(params.clientCompIdG4) || isNaN(body.moneyOwedG4)) {
        return res.status(400).send('Bad Request - needs client information'); // Return a 400 - Bad Request
    }

    // Call a stored procedure to process the update transaction.
    const q = `call CUSTOMER_UPDATE_G4(${params.clientCompIdG4}, '${body.clientCompNameG4}', '${body.clientCityG4}', '${body.clientCompPasswordG4}', ${body.moneyOwedG4});`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err) return reject(err);

        // Send the process results to the requestor.
        return res.send(data);
    });
});


module.exports = {
    getClientsG4,
    getClientByNoG4,
    updateClient
}