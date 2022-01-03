const express = require('express')
const router = express.Router();
const { pool } = require("../config/dbConfig");

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

module.exports = router;