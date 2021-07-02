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

/* Clients can create a PO and specify a part and it's quantity. */
const createPoG4 = (req, res) => new Promise((resolve, reject) => {

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameters are valid.
    if (isNaN(params.clientCompIdG4) || isNaN(body.partNoG4) || isNaN(body.qtyG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4, partNoG4 and qtyG4 must be valid numbers') // Return a 400 - Bad Request
    }

    const q = `call PROC_CREATE_PO_G4(${params.clientCompIdG4}, ${body.partNoG4}, ${body.qtyG4});`;
    const db = conn.getDB();
    db.query(q, (err, data) => {
        // Error occured with request
        if (err) return reject(err);

        // Request successful
        return res.status(200).send(data.message);
    });
});

/* The agents are able to directly change the PO status. */
const updatePoStatusG4 = (req, res) => new Promise((resolve, reject) => {

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameters are valid numbers.
    if (isNaN(params.poNoG4) || isNaN(body.statusG4)) {
        return res.status(400).send('Bad Request - poNoG4 and statusG4 must be valid numbers') // Return a 400 - Bad Request
    }

    const q = `UPDATE POsG4 SET statusG4='${body.statusG4}' WHERE poNoG4='${params.poNoG4}'`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err) return reject(err);

        // Request successful
        return res.status(200).send(data.message);
    });
});

const cancelPoG4 = (req, res) => new Promise((resolve, reject) => {

    const poNoG4 = req.params.poNoG4;

    // Check if the provided parameters are valid numbers.
    if (isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - poNoG4 must not be null') // Return a 400 - Bad Request
    }
    
    // Call a stored procedure to process the payment transaction.
    const q = `call PROC_CANCEL_THE_PROGRESSING_PO_G4(${poNoG4});`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err){
            reject(new Error('An error occurred: '+err));
            return res.send('An error occurred: '+err); //For now, we also inform the end user about the type of error.
        }else{
            // Send the process results to the requestor.
            return res.send('the purchase order ' + poNoG4 + ' has been canceled');
        }
    });
});

module.exports = {
    getPosG4,
    getPoByNoG4,
    clientGetPosG4,
    clientGetPoByNoG4,
    createPoG4,
    updatePoStatusG4,
    cancelPoG4
}