const express = require("express");
const bodyParser = require("body-parser");
const db = require('./config/dbConfig');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse incoming requests with JSON payloads

app.use(require("./api/routes/index.js"));

db.connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log("App started");
        });
    })
    .catch(err => console.log(err));
