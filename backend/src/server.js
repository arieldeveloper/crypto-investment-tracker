const express = require('express')
const app = express();
const port = process.env.PORT || 4000; // use 4000 if we are in dev mode

// home routes
const homeRoute = require('./api-routes/home');
app.use('/api/', homeRoute);

// user routes
const usersRoute = require('./api-routes/users');
app.use('/api/users', usersRoute);

// portfolio routes
const portfolioRoute = require("./api-routes/portfolio");
app.use('/api/portfolio', portfolioRoute);

// listen
app.listen(port, () => {
    console.log(`express is running on ${port}`)
});