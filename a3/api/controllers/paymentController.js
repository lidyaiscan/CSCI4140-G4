const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

//This functionality enables the client company to make a payment for a specific PO.
const makePaymentByPoNoAndClientCompIdG4 = (req, res) => new Promise((resolve, reject) => {

    //The following functionalities is now converted to use a "stored procedure" instead of running 
    //individual queries directly in the application code.

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameters are valid numbers.
    if (isNaN(params.clientCompIdG4) || isNaN(params.poNoG4) || isNaN(body.amountPaidG4) 
            || params.clientCompIdG4 < 0 || params.poNoG4 < 0 || body.amountPaidG4 < 0) {
        return res.status(400).send('Bad Request - clientCompIdG4, poNoG4, and amountPaidG4 must be positive numbers') // Return a 400 - Bad Request
    }
    
    // Call a stored procedure to process the payment transaction.
    const q = `call PROC_CLIENT_PAYMENT_G4(${params.poNoG4}, '${params.clientCompIdG4}', '${body.amountPaidG4}');`;
    const db = conn.getDB();
    db.query(q,  (err, data) => {

        // Error occured with request
        if (err){
            reject(new Error('An error occurred: '+err));
            return res.send('An error occurred: '+err); //For now, we also inform the end user about the type of error.
        }else{
            // Send the process results to the requestor.
            return res.send(data);
        }
    });
});

module.exports = {
    makePaymentByPoNoAndClientCompIdG4
}