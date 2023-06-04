const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON from the request body
app.use(bodyParser.json());

const save = require('./controller/save')
const read = require('./controller/read')

// POST endpoint
app.post('/newurl', save);

// GET endpoint
app.get('/:id', read);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
