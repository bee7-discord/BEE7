const fetch = require("node-fetch");

module.exports = {
    name: 'docs',
    category: 'Info',
    description: 'Look something up on the discord.js docs',
    usage: 'docs <search query> [version]',
    timeout: 5000,
    run: async (bot, message, args) => {
        // Fetch data from the api and send it to the channel
        const url = `https://djsdocs.sorta.moe/v2/embed?src=${args[1] || "stable"}&q`;
        if (!args[0]) return message.channel.send('Please specify something to search for!');

        const query = args[0];
        const response = await fetch(`${url}=${query}`);
        const json = await response.json();
        if (json == null) return message.reply("not found!");
        return message.channel.send({ embed: json });
    },
};