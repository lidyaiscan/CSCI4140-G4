const Promise = require('bluebird');
const conn = require('../../config/dbConfig');

const loginClientG4 = (req, res) => new Promise((resolve, reject) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Error - username or password not provided')
    }

    const q = `SELECT * FROM ClientG4 WHERE clientCompNameG4="${req.body.username}" AND clientCompPasswordG4="${req.body.password}"`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) {
          console.log('err', err)
          return reject(err);
        }

        // Request successful, account found
        if (data.length) {
         return res.status(200).send(data);
        }

        // Request successful, but user/pw does not match anything
        return res.status(401).send('Unauthorized')

    });
});


const loginAgentG4 = (req, res) => new Promise((resolve, reject) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Error - username or password not provided')
    }

    const q = `SELECT * FROM AgentsPasswordsG4 WHERE usernameG4="${req.body.username}" AND passwordG4="${req.body.password}"`;
    const db = conn.getDB();
    db.query(q, (err, data) => {

        // Error with request
        if (err) {
          console.log('err', err)
          return reject(err);
        }

        // Request successful, account found
        if (data.length) {
         return res.status(200).send(data);
        }

        // Request successful, but user/pw does not match anything
        return res.status(401).send('Unauthorized')

    });
});


module.exports = {
    loginClientG4,
    loginAgentG4
}