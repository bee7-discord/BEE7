/* eslint-disable brace-style */
const ms = require('ms');

module.exports = {
    name: 'mute',
    category: 'Moderation',
    description: 'Mute a member',
    usage: 'mute <user mention or id> <time> [reason]',
    timeout: 4000,
    permission: 'MANAGE_GUILD',
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // If the time is not valid, or there is no user, send a message conveying that info
            if (!args[0]) return message.channel.send(`Please provide an id or mention a user!`);
            if (!args[1] || !args[1].match("[dhms]")) return message.channel.send(`You did not use the correct formatting for the time! The valid options are \`d\`, \`h\`, \`s\`, or \`m\``);

            // Get the member
            const member = message.mentions.members.first();
            // If there is no member, send a message conveying that info
            if (!member) {
                return message.channel.send({
                    embed: {
                        color: 'RED',
                        title: 'I couldn\'t find that user! Please make sure you **mention** the user.',
                    },
                });
            }

            // Find the muted role, and if there is none, send a message conveying that info
            // TODO: Make the role assignable via the config command
            const mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
            if (!mutedRole) return message.channel.send(`Please make a role called \`Muted\` or \`muted\`!`);

            // Get the reason, and if there is no reason set the reason to No reason provided
            let reason = args.slice(2).join(' ');
            if (!reason) reason = 'No reason provided.';

            // Add the role to the user, and if there is an error, send it to the channel
            member.roles.add(mutedRole.id).catch(err => {
                return message.channel.send(`**ERROR:** ${err.message}\nEven though it says the person was muted, they *weren't*.`);
            });

            // When the mute expires, removed the muted role from the user
            setTimeout(() => {
                member.roles.remove(mutedRole.id).catch(err => {
                    return message.channel.send(err.message);
                });
            }, ms(args[1]));

            message.channel.send(`${member.username || member.user.username} was muted for \`${ms(args[1])}\`. Reason: ${reason}`);
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};