const express = require('express')
const router = express.Router();
const session = require('express-session');
const { pool } = require("../config/dbConfig");

// Redis config
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const redisClient = require('../config/redisConfig');

// middle ware
// Establishes connection to redis
router.use(session({
    store: new RedisStore({client:redisClient}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(express.json());

// ROUTES
/**
 * Adds a trade to the database
 */
router.post('/trade', (req, res) => {
    const sess  = req.session;
    // Check if user is logged in
    if (sess.passport.user !== undefined) {
        let {coin, amount, price} = req.body;

        let errors = [];

        // check for missing fields
        if (!coin || !amount || !price) {
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
            const values = [sess.email, coin, price, amount];

            // Make a query to insert the values into the database
            pool.query(text, values, (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                res.send(results.rows);
            });
        }
    } else {
        res.send("Please login");
    }
});

/**
 * Get all the trades for an authenticated user
 */
router.get('/trades',(req, res) => {
    const sess = req.session;
    if (sess.passport.user !== undefined) {
        pool.query(
            `SELECT * FROM trades WHERE email='${sess.email}'`, (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.rows.length > 0) {
                    res.send(results.rows);
                }
            });
    } else {
        // redirect to the login
        res.redirect("/api/users/login");
    }
  }
);


/**
 * Get all the coins that are from that users trades
 * Returns them in alphabetical order and remove any duplicates since
 * there can be multiple trades under the same coin name
 */
router.get('/coins',(req, res) => {
        const sess = req.session;
        if (sess.passport.user !== undefined) {
            pool.query(
                `SELECT DISTINCT ON (coin) coin FROM trades WHERE email='${sess.email}' ORDER BY coin`, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    if (results.rows.length > 0) {
                        res.send(results.rows);
                    }
                });
        } else {
            // redirect to the login
            res.redirect("/api/users/login");
        }
    }
);

/**
 * Get all the trades given a coin name in the post request
 * ex. {
 *     "coin":
 * }
 */
router.post('/coin',(req, res) => {
    const {coin} = req.body;
    const sess = req.session;
        if (sess.passport.user !== undefined) {
            pool.query(
                `SELECT * FROM trades WHERE (email='${sess.email}' AND coin='${coin}')`, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    if (results.rows.length > 0) {
                        res.send(results.rows);
                    }
                });
        } else {
            // redirect to the login
            res.redirect("/api/users/login");
        }
    }
);



module.exports = router;