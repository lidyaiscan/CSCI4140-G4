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

    const q = `SELECT POLinesG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4, POLinesG4.partNoG4, linePriceG4, PartsG4.currentPriceG4, POLinesG4.qtyG4 as POqtyG4, PartsG4.qtyG4 as partQtyG4, partNameG4 FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    INNER JOIN POLinesG4 ON POsG4.poNoG4=POLinesG4.poNoG4
    INNER JOIN PartsG4 ON POLinesG4.partNoG4 = PartsG4.partNoG4 
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
        return res.send(data);
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

// Added at A4
// Return a Purchase Order Summary By clientCompId and poNoG4
const clientGetPoSummaryG4 = (req, res) => new Promise((resolve, reject) => {
    const clientCompIdG4 = req.params.clientCompIdG4
    const poNoG4 = req.params.poNoG4
    
    if (isNaN(clientCompIdG4) || isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4 and poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POsG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4, datePOG4, statusDescriptionG4, SUM(POLinesG4.linePriceG4) AS TOTAL_COST, SUM(POLinesG4.qtyG4) as TOTAL_QTY FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    INNER JOIN POLinesG4 ON POsG4.poNoG4 = POLinesG4.poNoG4 WHERE POsG4.clientCompIdG4=${clientCompIdG4} AND POsG4.poNoG4=${poNoG4}
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

const clientGetPoAndClientG4 = (req, res) => new Promise((resolve, reject) => {
    const clientCompIdG4 = req.params.clientCompIdG4
    const poNoG4 = req.params.poNoG4

    if (isNaN(clientCompIdG4) || isNaN(poNoG4)) {
        return res.status(400).send('Bad Request - clientCompIdG4 and poNoG4 must be a number') // Return a 400 - Bad Request
    }

    const q = `SELECT POsG4.poNoG4, POsG4.clientCompIdG4, statusG4, clientCompNameG4,moneyOwedG4, clientCityG4, datePOG4, statusDescriptionG4 FROM POsG4 
    INNER JOIN StatusG4 ON POsG4.statusG4=StatusG4.statusNoG4 
    INNER JOIN ClientG4 ON POsG4.clientCompIdG4=ClientG4.clientCompIdG4 
    WHERE POsG4.clientCompIdG4=${clientCompIdG4} AND POsG4.poNoG4=${poNoG4}
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

// Replenish the quantity of the specific Part specified as the partNoG4
const agentCheckQTY = (req, res) => new Promise((resolve, reject) => {

    const params = req.params;
    const body = req.body;

    // Check if the provided parameter is a valid number.
    if (isNaN(params.PONoG4) ||
        params.partNoG4 < 0) {
        return res.status(400).send('Bad Request - partNoG4 must be positive numbers!') // Return a 400 - Bad Request
    }

    // Call a stored procedure to process the update transaction.
    const q = `call PROC_CHECK_QTY_G4 (${params.PONoG4}, '${params.commandG4}');`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occurred with request
        if (err) return reject(err);

        // Send the process results to the requestor.
        return res.send(data);
    });
});

//This function creates a PO then create varying number of associated PO Lines in one transaction.
const createpowithdetails = (req, res) => new Promise((resolve, reject) => {

    var connection = conn.getDB();

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }

        //parameters
        let clientIdG4 = req.params.clientCompIdG4;
        //note: po lines use req.body object directly.

        // Check if the parameter provided is a valid number
        if (isNaN(clientIdG4)) {
            return res.status(400).send('Bad Request - clientCompIdG4 must be a number') // Return a 400 - Bad Request
        }

        try{
            //(1) first, processed the new PO.
            let newPoId = 0;
            const q = `call PROC_NEW_PO_G4(${clientIdG4});`;
            const db = conn.getDB();
            db.query(q,  (err, results) => {

                if (err) {
                    connection.rollback(function() {
                      throw err;
                    });
                  }else{
                        //Receive the newly created unique ID for POsG4 table.
                        newPoId =  (JSON.parse(JSON.stringify(results)))[0][0].NEW_ID;
                        console.log('new Po Id: ', newPoId);

                        //If the new PO Id is 0, something is wrong.
                        if(newPoId === 0){
                            connection.rollback(function() {
                                console.log("PO not added.");
                                throw err;
                            });
                        }

                        //(2) next, process new PO Lines associated to the newly created PO above (Using the req.body).
                        req.body.forEach(function(poLine)
                        {
                            console.log(poLine.partNoG4);
                            processPOLines(connection, newPoId, parseInt(poLine.partNoG4), parseInt(poLine.qtyG4));
                        });

                        //Finalize the transaction
                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function() {
                                throw err;
                                });
                            }

                            console.log('Transaction Complete.');
                            /* End transaction */
                        });

                        res.send('The new PO and PO Lines are Successfully Created.');

                    }
                });

        // If errors, roll back.
        }catch(e){
            /* rolled back */
            console.log("Error happened. Rolled Back.");
            res.send('Error happened. Rolled Back.');
        }
    });

    console.log('end');

});

//This function call the PROC_NEW_POLINE_G4 stored procedure to create an individual PO LINE.
function processPOLines(connection, inNewPoNoG4, inPartNoG4, inQtyG4){
    //console.log('processLines begin');
    console.log(inNewPoNoG4+" "+inPartNoG4+" "+inQtyG4);
    const q = `call PROC_NEW_POLINE_G4(${inNewPoNoG4}, ${inPartNoG4}, ${inQtyG4});`;
    connection.query(q,  (err, res) => {
      if (err) {
        connection.rollback(function() {
          throw err;
        });
      }
    })
    //console.log('processLines end');
}

module.exports = {
    getPosG4,
    getPoByNoG4,
    clientGetPosG4,
    clientGetPoByNoG4,
    createPoG4,
    updatePoStatusG4,
    cancelPoG4,
    clientGetPoSummaryG4,
    clientGetPoAndClientG4,
    agentCheckQTY,
    clientGetPoSummaryG4,
    createpowithdetails
}