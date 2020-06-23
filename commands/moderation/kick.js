// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kick a user',
    usage: 'kick <user mention> [reason]',
    timeout: 5000,
    permission: 'KICK_MEMBERS',
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
             // If there is no person specified, return a message conveying that info
             if (!args[0]) {
                return message.channel.send(`Bro I can't kick nobody lol.`);
            }
            // Get the user
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            // If the bot couldn't find that user, then return a message conveying that info
            if (!user) {
                return message.channel.send({
                    embed: {
                        color: 'RED',
                        title: 'I couldn\'t find that user!',
                    },
                });
            }

            // Get the reason
            let reason = args.slice(1).join(' ');
            // if there is no reason, set the reason equal to No reason provided
            if (!reason) reason = 'No reason provided.';

            // if the person is not bannable, return a message saying that
            if (!user.kickable) {
                return message.channel.send({
                    embed: {
                        color: 'RED',
                        title: 'I can\'t kick that user!',
                    },
                });
            }

            // Send a dm to the user
            user.send(`You have been kicked from ${message.guild.name} for ${reason}`);

            // Ban the person
            user.kick({ reason: reason });

            // Send a message saying that the person was banned
            message.channel.send({
                embed: {
                    color: 'GREEN',
                    title: `${user.username || user.user.username} has been kicked for ${reason}`,
                },
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