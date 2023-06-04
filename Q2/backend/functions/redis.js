// save and read data from redis
const redis = require('redis');
console.log(`process.env.REDIS_HOST: ${process.env.REDIS_HOST}`)
const host = (process.env.REDIS_HOST !== undefined) ? process.env.REDIS_HOST : 'redis://localhost:6379';
const client = redis.createClient({ url: host });

client.on('error', (err) => {
    console.log(`Error: ${err}`);
});

client.connect();

module.exports = client;

