const redis = require('redis');

// create client
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
});

// turn on the client
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function () {
    console.log('Connected to redis successfully');
});

module.exports = redisClient;
