/* eslint-disable brace-style */
module.exports = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unban a member',
    usage: 'unban <member mention/id> [reason]',
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(`Lol no.`);

            if (!args[0]) return message.channel.send(`Bro I can't un-ban nobody lol.`);
            const user = bot.users.fetch(args[0]);

            let reason = args.slice(1).join(' ');
            if (!reason) reason = 'No reason provided.';

            message.guild.members.unban(args[0], reason);

            user.send(`You have been unbanned from ${message.guild.name} for ${reason}`);

            message.channel.send({
                embed: {
                    color: 'GREEN',
                    title: `User has been unbanned for ${reason}`,
                },
            });
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};