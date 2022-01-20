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
 * Adds a Hold to the database
 */
 router.post('/new_hold', (req, res) => {
    const sess  = req.session;
    // Check if user is logged in
    if (sess.passport.user !== undefined) {
        let {coin, amount, spent} = req.body;

        let errors = [];

        // check for missing fields
        if ((!coin || !amount || !spent ) && (spent != 0 || amount != 0) ) {
            console.log("yeet " + coin);
            console.log("yeet" + amount);
            console.log("yeet" + spent);
            errors.push({message: "Please enter all of the fields"});
        }

        // check for password length
        if (amount < 0 || spent < 0) {
            errors.push({message: "The amount and price needs to be a positive number"});
        }

        if (errors.length > 0) {
            // not validated
            console.log(errors);
            res.send(errors);
        } else {
            // validated
            const text = `INSERT INTO holds (email, coin, amount, spent) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [sess.email, coin, amount, spent];

            // Make a query to insert the values into the database
            pool.query(text, values, (err, results) => {
                if (err) {
                    console.log('other error')
                    throw err;
                }
                console.log('created');
                res.send(results.rows);
            });
        }
    } else {
        res.send("Please login");
    }
});


// ROUTES
/**
 * Updates a hold in the database
 */
 router.post('/update_hold', (req, res) => {
    const sess  = req.session;
    // Check if user is logged in
    if (sess.passport.user !== undefined) {
        let {coin, amount, spent} = req.body;

        let errors = [];

        // check for missing fields
        if (!coin || !amount || !spent) {
            console.log(coin);
            console.log(amount);
            console.log(spent);
            errors.push({message: "Please enter all of the fields"});
        }

        // check for password length
        if (amount <= 0 || spent <= 0) {
            errors.push({message: "The amount and price needs to be a positive number"});
        }

        if (errors.length > 0) {
            // not validated
            res.send(errors);
        } else {
            // validated
            const text = `UPDATE holds SET amount = '${amount}', spent = '${spent}' WHERE (email='${sess.email}' AND coin='${coin}') RETURNING spent`;

            // Make a query to insert the values into the database
            pool.query(text, (err, results) => {
                if (err) {
                    console.log('failed')
                    throw err;
                }
                console.log('updated');
                res.send(results.rows);
            });
        }
    } else {
        res.send("Please login");
    }
});



/**
 * Checks if hold exists given a coin name in the post request
 * If it does the hold is updated, if not it adds the hold to the database
 * ex. {
 *     "coin":
 * }
 */
 router.post('/coin',(req, res) => {
    const {coin} = req.body;
    console.log(coin);
    const sess = req.session;
        if (sess.passport.user !== undefined) {
            pool.query(
                `SELECT * FROM holds WHERE (email='${sess.email}' AND coin='${coin}')`, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    if (results.rows.length == 0) {
                        res.send(true);
                    }
                    else {
                        res.send(false)
                    }

                });
        } else {
            // redirect to the login
            res.redirect("/api/users/login");
        }
    }
);


/**
 * Get all the Holds for an authenticated user
 */
 router.get('/holds',(req, res) => {
    const sess = req.session;
    if (sess.passport.user !== undefined) {
        pool.query(
            `SELECT * FROM holds WHERE email='${sess.email}'`, (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.rows.length > 0) {
                    console.log(results.rows)
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