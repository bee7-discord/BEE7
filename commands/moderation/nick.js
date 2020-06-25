// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nick',
    category: 'Moderation',
    description: 'Change a users nick',
    usage: 'nick <user mention or id>',
    timeout: 2000,
    aliases: [""],
    permission: 'MANAGE_GUILD',
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // Get the user
            const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
            // If no user return a message
            if(!user) return message.delete() && message.channel.send('Bruh specify a person');
            // Set the nickname
            await user.setNickname(args.slice(1).join(' '));
            // Return a message saying nickname was changed
            return message.channel.send(`**${user.user.username}'s** nick changed to **${args.slice(1).join(' ')}**`);
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};