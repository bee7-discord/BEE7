/* eslint-disable brace-style */
module.exports = {
    name: "ban",
    category: "Moderation",
    description: "Ban a member",
    usage: "ban <member mention/id> [reason]",
    timeout: 5000,
    permission: "BAN_MEMBERS",
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // If there is no person specified, return a message conveying that info
            if (!args[0]) {
                return message.channel.send(`Bro I can't ban nobody lol.`);
            }
            // Get the user
            const user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);

            // If the bot couldn't find that user, then return a message conveying that info
            if (!user) {
                return message.channel.send({
                    embed: {
                        color: "RED",
                        title: "I couldn't find that user!",
                    },
                });
            }

            // Get the reason
            const reason = args.slice(1).join(" ");
            // if there is no reason, set the reason equal to No reason provided
            if (!reason)
                return message.channel.send(`You must provide a reason!`);

            // if the person is not bannable, return a message saying that
            if (!user.bannable) {
                return message.channel.send({
                    embed: {
                        color: "RED",
                        title: "I can't ban that user!",
                    },
                });
            }

            // Send a dm to the user
            user.send(
                `You have been banned from ${message.guild.name} for ${reason}`,
            );

            // Ban the person
            user.ban({ reason: reason });

            // Send a message saying that the person was banned
            message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `${
                        user.username || user.user.username
                    } has been banned | ${reason}`,
                },
            });
        } catch (err) {
            const db = require("../../db");
            const prefix = (await db.get(`Prefix_${message.guild.id}`))
                ? await db.get(`Prefix_${message.guild.id}`)
                : "!";
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(
                `**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`,
            );
        }
    },
};
