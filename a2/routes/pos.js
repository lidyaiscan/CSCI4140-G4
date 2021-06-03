var express = require('express');
var router = express.Router();
const sql = require("../db.js");


router.get('/', function(req, res){
   const poNo = req.params.poNo

   sql.query(`SELECT * FROM posg4`, (err, result) => {

      // Failed request
      if (err) {
        console.log("error: ", err);
        res.status(400).send(err, null);
        return;
      }
      
      // Successful request, data found
      if (result.length) {
        res.status(200).send(result) // send entire results array 
        return;
      }

      // Successful request, but no data
      res.status(200).send([])
      return;
  
    });
});

router.get('/:poNo', function(req, res){
   const poNo = req.params.poNo

   sql.query(`SELECT * FROM posg4 WHERE poNoG4 = ${poNo}`, (err, result) => {

      // Failed request
      if (err) {
        console.log("error: ", err);
        res.status(400).send(err, null);
        return;
      }
      
      // Successful request, data found
      if (result.length) {
        console.log("found purchase order: ", result[0]);
        res.status(200).send(result[0])
        return;
      }

      // Successful request, but no data
      res.status(200).send([])
      return;
  
    });
});

//export this router to use in our index.js
module.exports = router;