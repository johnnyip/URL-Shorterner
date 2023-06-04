// save data to mongodb
const MongoClient = require('mongodb').MongoClient;
// Load from .env file
require('dotenv').config();
const url = (process.env.MONGO_URL !== undefined) ? process.env.MONGO_URL : `mongodb://localhost:27017`;
const client = new MongoClient(url, { useNewUrlParser: true });

(async () => {
    await client.connect();
})();

module.exports = client;
