// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'sadcat',
    category: 'Fun',
    description: 'Get a random sadcat image',
    usage: 'sadcat',
    timeout: 2000,
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // Fetch a image and send the image
            const msg = await message.channel.send('<a:loading:721436743550763055>');
            axios.get(`https://api.alexflipnote.dev/sadcat`).then(response => {
                msg.delete();
                message.channel.send(response.data.file);
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