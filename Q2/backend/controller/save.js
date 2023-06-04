const mongoClient = require('../functions/mongo')
const redisClient = require('../functions/redis');

const randomID = require('../functions/randomID')

module.exports = async (req, res) => {
    console.log(req.body)
    try {
        const id = randomID();

        // Get the documents collection
        const db = mongoClient.db("Sample");
        const collection = db.collection('urls');
        const doc = {
            url: req.body.url,
            shortenUri: `https://shortenurl.org/${id}`
        }

        // Insert some documents, add _id to the object doc
        const docWithId = Object.assign({ _id: id }, doc);
        collection.insertOne(docWithId)

        //Save to redis cache
        redisClient.set(id, JSON.stringify(doc));

        res.status(200).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
