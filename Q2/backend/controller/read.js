const mongoClient = require('../functions/mongo')
const redisClient = require('../functions/redis');

module.exports = async (req, res) => {
    console.log(req.params)
    let result = ""
    try {
        const id = req.params.id;

        //try to find in redis cache
        const dataFromRedis = await redisClient.get(id)

        if (!dataFromRedis) {
            // Not found in redis
            console.log("Redis cache miss")

            // Get the documents collection
            const db = mongoClient.db("Sample");
            const collection = db.collection('urls');
            // Find some documents
            result = await collection.find({ _id: id }).toArray();
            console.log(`db result: ${result}`)

            // Save the result to the redis cache
            if (result !== undefined && result.length > 0) {
                result = result[0]
                redisClient.set(id, JSON.stringify(result));
            } else {
                res.status(404).json({ error: 'URL Not found' });
                return
            }
        } else {
            // Found in redis
            // console.log("Redis cache hit")
            result = JSON.parse(dataFromRedis)
        }

        // 302 status code, and redirect to the url
        res.status(302).redirect(result.url);
        // res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
