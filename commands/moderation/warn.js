/* eslint-disable brace-style */
const warns = require('../../models/warns');

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    category: 'Moderation',
    usage: 'warn <User mention> <Reason>',
    timeout: 5000,
    run: async (bot, message, args) => {
        try {
            // Get the user
            const user = message.mentions.users.first();
            // If there is no user, return a message
            if (!user) return message.channel.send(`You did not mention a user or provide a id!`);
            // If there is no reason, return amessage
            if (!args.slice(1).join(" ")) return message.channel.send(`You must provide a reason!`);
            // Find one entry in the warns database, where the guild id is the message guild id and the user id is the user id of the person getting warned
            warns.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
                if (err) console.log(err);
                if (!data) {
                    const newWarns = new warns({
                        User: user.id,
                        Guild: message.guild.id,
                        Warns: [
                            {
                                Moderation: message.author.id,
                                Reason: args.slice(1).join(" "),
                            },
                        ],
                    });
                    newWarns.save();
                    message.channel.send(`${user.tag} has been warned. Reason: ${args.slice(1).join(" ")} They now have 1 warn.`);
                }
                else {
                    data.Warns.unshift({
                        Moderator: message.author.id,
                        Reason: args.slice(1).join(" "),
                    });
                    data.save();
                    message.channel.send(`${user.tag} has been warned. Reason: ${args.slice(1).join(" ")} They now have ${data.Warns.length} warns.`);
                }
            });
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};