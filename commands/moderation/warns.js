/* eslint-disable brace-style */
const warns = require('../../models/warns');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warns',
    description: 'Get a users warns',
    category: 'Moderation',
    usage: 'warns <user>',
    timeout: 3000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Get the user, and if there is no user, return a message
            const user = message.mentions.members.first();
            if (!user) return message.channel.send(`Please **mention** a user!`);
            // Find the warns of the user, and map it into a embed
            warns.find({ Guild: message.guild.id, User: user.id }, async (err, data) => {
                if (err) console.log(err);
                if (!data.length) return message.channel.send(`${user.user.tag} doesn't have any warns!`);
                console.log(data.length);
                const Embed = new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warning(s) in ${message.guild.name}`)
                    .setColor('RANDOM')
                    .setDescription(data.map(d => {
                        return d.Warns.map((w, i) => `${i} - Moderator: ${message.guild.members.cache.get(w.Moderator)} Reason: ${w.Reason}`).join('\n\n');
                    }));
                message.channel.send(Embed);
            });
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};