const { readdirSync } = require("fs");
const ascii = require('ascii-table');
const table = new ascii('Commands');
table.setHeading('File Name', 'Load Status');

module.exports = (bot) => {
    // Read the directory called command
    readdirSync("./commands/").map(dir => {
        // Get all the sub folders
        // eslint-disable-next-line no-unused-vars
        const commands = readdirSync(`./commands/${dir}/`).map(cmd => {
            // Get the command
            const pull = require(`../commands/${dir}/${cmd}`);
            // Add the command to bot.commands
            bot.commands.set(pull.name, pull);
            table.addRow(cmd, '✓');
            // Load the aliases and add it to bot.aliases
            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
            }
        });
        console.log(table.toString());
    });
};