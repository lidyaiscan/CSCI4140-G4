const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

// Return all Purchase Orders
const getPosG4 = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT POsG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4 FROM POsG4 INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4';
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

// Return specific Purchase Order by poNo
const getPoByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4

    // Check if the parameter provided is a valid number
    if (isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POLinesG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4, partNoG4, linePriceG4, qtyG4 FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    INNER JOIN POLinesG4 ON POsG4.poNoG4=POLinesG4.poNoG4
    WHERE POLinesG4.poNoG4 = ${poNoG4}`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) return reject(err);

        // Request successful, data found
        if (data.length) {
            return res.status(200).send(data);
        }
        
        // Request successful, but no data
        return res.status(200).send([]);
    });
});

// Return all Purchase Orders By clientCompId
const clientGetPosG4 = (req, res) => new Promise((resolve, reject) => {
    const clientCompIdG4 = req.params.clientCompIdG4
    
    if (isNaN(clientCompIdG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POsG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4, SUM(POLinesG4.linePriceG4) AS TOTAL_COST, SUM(POLinesG4.qtyG4) as TOTAL_QTY FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    INNER JOIN POLinesG4 ON POsG4.poNoG4 = POLinesG4.poNoG4 WHERE POsG4.clientCompIdG4=${clientCompIdG4}
    GROUP BY POsG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4`;
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

// Return specific Purchase Order by poNo and clientCompId
const clientGetPoByNoG4 = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4
    const clientCompIdG4 = req.params.clientCompIdG4

    // Check if the parameters provided are valid numbers
    if (isNaN(clientCompIdG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4 must be a number') // Return a 400 - Bad Request
    }

    if (isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POLinesG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4, partNoG4, linePriceG4, qtyG4 FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    INNER JOIN POLinesG4 ON POsG4.poNoG4=POLinesG4.poNoG4
    WHERE POLinesG4.poNoG4 = ${poNoG4} AND POsG4.clientCompIdG4 = ${clientCompIdG4}`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) return reject(err);

        // Request successful, data found
        if (data.length) {
            return res.status(200).send(data);
        }
        
        // Request successful, but no data
        return res.status(200).send([]);
    });
});

module.exports = {
    getPosG4,
    getPoByNoG4,
    clientGetPosG4,
    clientGetPoByNoG4
}