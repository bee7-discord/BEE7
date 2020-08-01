// Force the bot to run as priority
const { exec } = require("child_process");
exec(
    'wmic process where "ProcessId=' + process.pid + '" CALL setpriority 9999',
);
// Require discord.js
const { Collection, Client } = require("discord.js");
// Require fs
const fs = require("fs");
// Init a new Client
const bot = new Client({ disableEveryone: true });
// Fetch token and mongo db uri from config.json
const { token, apiKey } = require("./config.json");
// Ksoft API
const { KSoftClient } = require("@ksoft/api");
// Alexflipnote.js
const client = require("alexflipnote.js");
const alexclient = new client();

// Init some variables and store them in the client instance
bot.commands = new Collection();
bot.aliases = new Collection();
bot.snipes = new Map();
bot.ksoft = new KSoftClient(apiKey);
bot.alexclient = alexclient;

bot.categories = fs.readdirSync("./commands/");
// Require the command and event handler
["command", "event"].forEach((cmdHandler) => {
    require(`./handlers/${cmdHandler}`)(bot);
});

// Snipe + Logging
bot.on("messageDelete", (message) => {
    require("./events/guild/messagedelete.js")(bot, message);
});

// Error Handling
process.on("unhandledRejection", (error) =>
    console.error("Uncaught Promise Rejection", error),
);

// Login to the bot
bot.login(token);
