const express = require('express')
const router = express.Router();

const { pool } = require("../config/dbConfig");

// middle ware
router.use(express.json());

router.get('/', (req, res) => {
    res.send('Welcome to the portfolio');
});

// make a trade - will connect to the front end form for it
router.post('/trade', (req, res) => {
    let {email, coin, amount, price} = req.body;

    let errors = [];

    // check for missing fields
    if (!email || !email || !amount || !price) {
        errors.push({message: "Please enter all of the fields"});
    }

    // check for password length
    if (amount <= 0 || price <= 0) {
        errors.push({message: "The amount and price needs to be a positive number"});
    }

    if (errors.length > 0) {
        // not validated
        res.send(errors);
    } else {
        // validated
        const text = `INSERT INTO trades (email, coin, price, amount_of_coins) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [email, coin, price, amount];

        pool.query(text, values, (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);
            res.send(results.rows);
        })
    }

});

module.exports = router;