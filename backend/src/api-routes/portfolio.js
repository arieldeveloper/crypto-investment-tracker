const express = require('express')
const router = express.Router();
const session = require('express-session');
const { pool } = require("../config/dbConfig");
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const redisClient = require('../config/redisConfig');


// middle ware
router.use(session({
    store: new RedisStore({client:redisClient}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Welcome to the portfolio');
});

/**
 * Adds a trade to the database
 */
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

router.get('/trades', (req, res) => {
    const sess = req.session;
    console.log(sess);
    pool.query(
            `SELECT * FROM trades`, (err, results) => {
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