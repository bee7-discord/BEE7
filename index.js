// Require discord.js
const { Collection, Client } = require('discord.js');
// Require fs
const fs = require('fs');
// Init a new Client
const bot = new Client({ disableEveryone: true });
// Fetch token and mongo db uri from config.json
const { token, uri } = require('./config.json');
// Require mongoose
const mongoose = require('mongoose');
// Require vultrex.db
const { VultrexDB } = require('vultrex.db');

// Init some variables and store them in the client instance
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync('./commands/');
// Require the command and event handler
["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

// Init a new Vultrex DB
const db = new VultrexDB({
    provider: 'sqlite',
    table: 'main',
    fileName: 'vultrexDBMain',
});
// Set bot.db equal to db
db.connect().then(() => {
    bot.db = db;
});

// Connect to mongo db
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log(`Mongodb connected!`))
.catch(err => console.log(err));

// Login to the bot
bot.login(token);