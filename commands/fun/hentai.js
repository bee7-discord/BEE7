// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hentai',
    category: 'Fun',
    description: 'Gives you some epic hentai',
    usage: 'hentai',
    timeout: 2000,
    aliases: [""],
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // I was bored lmao
            message.author.send('**LMAO YOU ACTUALLY THOUGHT I WOULD PUT THIS IN THE BOT!!! HERE IS YOUR HENTAI YOU SICK HUMAN** https://tenor.com/view/rick-astley-rick-roll-gif-14097983');
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};