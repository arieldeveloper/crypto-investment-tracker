const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const connectRedis = require('connect-redis');
const { pool } = require("../config/dbConfig");
const RedisStore = connectRedis(session)
const redisClient = require('../config/redisConfig');

const passport = require("passport");
const initializePassport = require("../config/passportConfig");
initializePassport(passport); // sets up the passport to be used in app

// middle ware
router.use(session({
    store: new RedisStore({client:redisClient}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(express.json());
router.use(flash());

/**
 * This function redirects the route if the user IS authenticated
 */
function checkAuthenticated(req, res, next) {
    // if user is authenticated
    if (req.isAuthenticated()) {
        return res.redirect('');
    }
    return next();
}

/**
 * This function redirects a route if the user is NOT authenticated
 */
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('login');
}

// Routes
router.get('/login', (req, res) => {
    res.send("Please login");
});

router.get("/register", checkAuthenticated, ((req, res) => {
    res.send("Please register");
}))

router.get('/logout', (req, res) => {
    req.logOut(); // built in function with passport
    res.send("You are now logged out. Please log back in")
});

/**
 * Logs the user out when making a get request to this route
 */
router.get('/', checkNotAuthenticated, (req, res) => {
    const sess = req.session;
    if (sess.email) {
        res.send(`You are currently logged in with ${sess.email}`)
    } else {
        res.send("HOME PAGE OF USERS DASHBOARD (need to login)")
    }
});

/**
 * Post request to register a user. Registers user
 * Required:
 * {
 *     "name":
 *     "email":
 *     "password":
 *     "password2":
 * }
 */
router.post('/register', async(req, res) => {
    let {name, email, password, password2} = req.body;

    // print the values for testing
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    // Validation checks for registration

    // check for missing fields
    if (!name || !email || !password || !password2) {
        errors.push({message: "Please enter all of the fields"});
    }

    // check for password length
    if (password.length < 6) {
        errors.push({message: "Password should be at least 6 characters"});
    }

    // check for matching of passwords
    if (password !== password2) {
        errors.push({message:"Passwords do not match"});
    }

    if (errors.length > 0) {
        // Form not validated
        console.log(errors)
        res.send(errors);
    } else {
        // Form validation passed

        // hash the password
        let passwordHashed = await bcrypt.hash(password, 10);

        // Check if user already exists (emails match)
        pool.query(
            `SELECT * FROM users 
            WHERE email = $1`, [email], (err, results)=> {
                // throw error if so
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    // user already exists
                    errors.push({message: "user already registered"})
                    res.send(errors);
                } else {
                    // user does not exist yet
                    const text = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
                    const values = [name, email, passwordHashed];

                    pool.query(text, values, (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            res.send(results.rows);
                        }
                    );
                }
            }
        );
    }
});


/**
 * To login, required in the body:
 * {
 *   "email":
 *   "password":
 * }
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
        // this gets called if login successful
        const sess  = req.session;
        const { email } = req.body;
        sess.email = email;
        res.send("success");
    }
);

module.exports = router;