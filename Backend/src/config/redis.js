const {createClient } = require('redis');
// require('dotenv').config();

// this code part is connected redis database(i.e. InMemory database)
const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 10971
    }
});

module.exports = redisClient;