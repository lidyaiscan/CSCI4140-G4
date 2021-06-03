const mysql = require('mysql2');
const express = require('express');
const pos = require('./routes/pos.js');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse incoming requests with JSON payloads

app.use('/pos', pos);

app.get('/', function(req, res){
   res.send("Connection successful!");
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
