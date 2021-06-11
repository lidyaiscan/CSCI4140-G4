const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

//This functionality enables the client company to make a payment for a specific PO.
const makePaymentByPoNoAndClientCompIdG4 = (req, res) => new Promise((resolve, reject) => {

    //This section is ideally to be converted to a "stored procedure" and be called by a trigger.
    //At this iteration, we have implemented the multiple SQL statements below in the application code.
    //In the future iteration, we will convert them into a stored procedure along with a proper trigger,
    //once we know more about the front end and the detailed business rules/logics.

    const body = req && req.body;
    const params = req && req.params;

    // Check if the provided parameters are valid numbers.
    if (isNaN(params.clientCompIdG4) || isNaN(params.poNoG4) || isNaN(body.amountPaidG4) 
            || params.clientCompIdG4 < 0 || params.poNoG4 < 0 || body.amountPaidG4 < 0) {
        return res.status(400).send('Bad Request - clientCompIdG4, poNoG4, and amountPaidG4 must be positive numbers') // Return a 400 - Bad Request
    
        }else{

        // Connect to DB
        const db = conn.getDB();
    
        // Retrieve the total price and compare with payment amount. 
        // If the value matches, then (1) record the payment in the PaymentG4 table, 
        // (2) update the statusG4 in POsG4 table to 2 (= Paid), and
        // (3) deduct the paid amount from the moneyOwedG4 in the ClientG4 table.
        const cntPrice = `SELECT COUNT(*) as count, SUM(linePriceG4) as totalprice FROM POsG4 INNER JOIN POLinesG4 USING(poNoG4) WHERE POsG4.poNoG4 = ${params.poNoG4} AND POsG4.clientCompIdG4 = ${params.clientCompIdG4}`;
        db.query(cntPrice,  (err, data) => { 
            
            if (data[0]['count'] == 0){
            // Return if there is no such product order for the given PO number and given client Id.
                    return res.status(400).send('Bad Request - There is no product order for the PO number and client Id.');

            }else if (data[0]['totalprice'] != body.amountPaidG4){
            // Note: The assumed business rule: 
            //       If the payment amount does not exactly match the amount actually owed for the PO, reject the payment. 

                    return res.status(400).send('Bad Request - The payment amount is not accurate for the cost of the product order.');
            }else{                
                // Take the payment by (1) recording the payment in the PaymentG4 table, (2) changing the status to 2 (= Paid) in the POsG4 table,
                // and (3) deducting the paid amount from moneyOwedG4 from the ClientG4 table.

                // Note (& Future enhancement):
                // At a future iteration, we will wrap the following SQL insert & update statements with the "transaction" (commit, rollback) features;
                // but for now, we are executing these in the application code.

                let abort = false; // to determine if the transaction is normally processed.

                // check if the payment has been already made. If so, abort the request.
                const cntPaid = `SELECT COUNT(*) as paymentCount FROM PaymentG4 WHERE poNoG4=${params.poNoG4}`;
                db.query(cntPaid,  (err, data) => {

                    if(data[0]['paymentCount'] != 0){
                        return res.status(400).send('Error - The PO has been already paid.');

                    }else{

                        // (1) record the payment in the PaymentG4 table.                     
                        const insertPayment = `INSERT INTO PaymentG4 (poNoG4, amountPaidG4) VALUES (${params.poNoG4}, ${body.amountPaidG4})`;
                        db.query(insertPayment,  (err, data) => {
                            if (err){
                                abort = true; // If error, abort the process. Later, this will be replaced with the "transaction" features.
                                return res.status(400).send('Error - Your request had an error and got cancelled.');
                            }
                        });

                        // (2) update the PO status to 2 (= Paid) in the POsG4 table.
                        if(abort == false){

                            const updatePOstatus = `UPDATE POsG4 SET statusG4 = 2 WHERE POsG4.poNoG4 = ${params.poNoG4}`;
                            db.query(updatePOstatus,  (err, data) => {
                                if (err){
                                    abort = true; // If error, abort the process. Later, this will be replaced with the "transaction" features.
                                    return res.status(400).send('Error - Your request had an error and got cancelled.');
                                }        
                            });

                            // (3) deduct the paid amount from moneyOwedG4 from the ClientG4 table.
                            if(abort == false){
                                const updateClientAmtOwing = `UPDATE ClientG4 SET moneyOwedG4 = (moneyOwedG4 - ${body.amountPaidG4}) WHERE clientCompIdG4='${params.clientCompIdG4}'`;
                                db.query(updateClientAmtOwing,  (err, data) => {
                                    if (err){
                                        abort = true; // If error, abort the process. Later, this will be replaced with the "transaction" features.
                                        return res.status(400).send('Error - Your request had an error and got cancelled.');
                                    }else{
                                        return res.status(200).send('Your payment has been successfully processed.');
                                    }        
                                }); 
                            } // (3) ends
                        } // (2) ends
                    }             
                });
            } 
        });
    };   
});

module.exports = {
    makePaymentByPoNoAndClientCompIdG4
}