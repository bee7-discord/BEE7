const { MongoClient } = require('salvage.db');

// Init a new MongoClient
const db = new MongoClient({
    schema: {
        name: 'prefixes',
    },
    mongoURI: require('./config.json').uri,
});

module.exports = db;