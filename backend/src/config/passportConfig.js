const LocalStrategy = require("passport-local").Strategy;
const {pool} = require("../config/dbConfig");
const bcrypt = require("bcrypt");

/**
 * Initializes the passport responsible for authenticating the user.
 * This method currently uses local strategy and uses bcrypt to authenticate the password
 * @param passport
 */
function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        // check if email and password exists in the database
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                // if found user
                if (results.rows.length> 0) {
                    const user = results.rows[0];
                    // compare if they enter the right password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        // if password entered is correct
                        if (isMatch) {
                            return done(null, user);
                        } else { // password is not correct
                            return done(null, false, {message: "Password entered is not correct"} );
                        }
                    });
                } else {
                    // no user found
                    return done(null, false, {message: "email not registered"});
                }
            }
        )
    }
    passport.use(new LocalStrategy(
        {
        usernameField: "email",
        passwordField: "password"
        }, authenticateUser)
    );

    // store the user id in session cookie
    passport.serializeUser((user, done) => done(null, user.id));

    // uses the id to obtain user details from the database and store object
    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM users WHERE id = $1`, [id], (err, results)=>{
                if (err) {
                    throw err;
                }
                return done(null, results.rows[0]);
            }
        )
    });
    console.log("initialized passport");
}

// export the function
module.exports = initialize;
