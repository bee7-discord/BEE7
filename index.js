// Force the bot to run as priority
const {exec} = require('child_process');
exec('wmic process where "ProcessId=' + process.pid + '" CALL setpriority 9999');
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
bot.snipes = new Map();

bot.categories = fs.readdirSync('./commands/');
// Require the command and event handler
["command", "event"].forEach(cmdHandler => {
    require(`./handlers/${cmdHandler}`)(bot);
});


// Snipe
bot.on('messageDelete', message => {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    });
});

// Error Handling
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

// Connect to mongo db
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log(`Mongodb connected!`))
.catch(err => console.log(err));

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

// Login to the bot
bot.login(token);