const express = require('express');
const axios = require('axios');
const router = express.Router();
const { pool } = require("../config/dbConfig");
router.use(express.json());
router.get('/', (req, res) => {
    res.send('Main page loaded!')
});

/**
 * This route shows all of the users registered by making a query to our database
 */
router.get('/info/', (req, res) => {
    pool.query(
        `SELECT * FROM users`, (err, results) => {
            if (err) {
                throw err;
            }
            if (results.rows.length > 0) {
                res.send(results.rows);
            }
        })
    }
);

router.post('/ticker/', (req, res) => {
    let tickerName = req.body.ticker;
    const apiKey = process.env.API_KEY;
    const stringNeeded = "?CMC_PRO_API_KEY=" + apiKey + "&symbol=" + tickerName;
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    const totalUrl = url + stringNeeded;

    axios.get(totalUrl)
        .then(response => {
    res.send(response.data);
    })
        .catch(error => {
            console.error(error)
        });
});

module.exports = router;
