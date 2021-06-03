const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const getPos = (req, res) => new Promise((resolve, reject) => {
    const q = 'SELECT * FROM posg4';
    const db = conn.getDB();
    db.query(q, (err, data) => {
        if (err) return reject(err);
        return res.send(data);
    });
});

const getPoByNo = (req, res) => new Promise((resolve, reject) => {
    const poNoG4 = req.params.poNoG4
    const q = `SELECT * FROM posG4 WHERE poNoG4 = ${poNoG4}`;
    const db = conn.getDB();
    db.query(q, (err, data) => {
        if (err) return reject(err);
        return res.send(data);
    });
});

module.exports = {
    getPos,
    getPoByNo
}