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

<<<<<<< HEAD
/**
 * Provide the post request with a body (ex. {ticker: "BTC"}) and it will return the information on that
 * ticker using the coinmarketcap api
 */
 router.post('/ticker2/', (req, res) => {
    const tickerName = req.body.ticker;
    const stringNeeded = "?CMC_PRO_API_KEY=" + 'dc223376-a632-41a9-8c70-b3ba8eb38f7f' + "&symbol=" + `${tickerName}`;
=======
router.post('/ticker/', (req, res) => {
    let tickerName = req.body.ticker;
    const apiKey = process.env.API_KEY;
    const stringNeeded = "?CMC_PRO_API_KEY=" + apiKey + "&symbol=" + tickerName;
>>>>>>> 17a1159ee03f8e96d6174248d44f9272b1ab6dde
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    const totalUrl = url + stringNeeded;

    axios.get(totalUrl)
        .then(response => {
<<<<<<< HEAD
            res.send(response.data);
        })
=======
    res.send(response.data);
    })
>>>>>>> 17a1159ee03f8e96d6174248d44f9272b1ab6dde
        .catch(error => {
            console.error(error)
        });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 17a1159ee03f8e96d6174248d44f9272b1ab6dde
