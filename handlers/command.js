const { readdirSync } = require("fs");
module.exports = (bot) => {
    // Read the directory called command
    readdirSync("./commands/").map(dir => {
        // Get all the sub folders
        // eslint-disable-next-line no-unused-vars
        const commands = readdirSync(`./commands/${dir}/`).map(cmd => {
            // Get the command
            const pull = require(`../commands/${dir}/${cmd}`);
            // Console log that it loaded the command
            console.log(`Loaded command ${pull.name}`);
            // Add the command to bot.commands
            bot.commands.set(pull.name, pull);
            // Load the aliases and add it to bot.aliases
            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
            }
        });
    });
};