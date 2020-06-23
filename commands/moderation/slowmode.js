// eslint-disable-next-line
const ms = require('ms');
const humanizeDuration = require('humanize-duration');

module.exports = {
    name: 'slowmode',
    category: 'Moderation',
    description: 'Set the slowmode of the current channel',
    usage: 'slowmode <time in seconds>',
    timeout: 3000,
    aliases: ["slowchat"],
    permission: 'MANAGE_CHANNELS',
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // If there are no args, send the current slowmode
            if(!args[0]) return message.channel.send(`Current slowmode: **${humanizeDuration(message.channel.rateLimitPerUser * 1000)}**`);
            // if the slowmode is too big, send a message
            if(ms(args[0]) >= 21600) return message.channel.send(`Bro why are you setting it for that long, set it to something shorter.`);
            // Set the slowmode
            message.channel.setRateLimitPerUser(ms(args[0]), 'Slowmode command');
            // Send a message to the channel
            message.channel.send(`Changed slowmode to **${humanizeDuration(args[0] * 1000)}**`);
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};