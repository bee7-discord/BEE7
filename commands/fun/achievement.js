// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'achievement',
    category: 'Fun',
    description: 'Generate a Minecraft achievement',
    usage: 'achievement <text>',
    timeout: 5000,
    aliases: [""],
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // Fetch data from a api, and send the image
            if(!args[0]) return message.channel.send('Provide some text');
            axios.get(`https://api.alexflipnote.dev//achievement?text=${args.join('%20')}`).then(response => {
                message.channel.send(response.config.url);
            });
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};