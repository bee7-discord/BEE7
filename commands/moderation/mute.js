/* eslint-disable brace-style */
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "mute",
    category: "Moderation",
    description: "Mute a member",
    usage: "mute <user mention or id> <time> <reason>",
    timeout: 4000,
    permission: "MANAGE_GUILD",
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // check if the user trying to run the command has permissions to kick and ban members
            if (
                !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])
            ) {
                message.channel.send(
                    "You don't have permission to mute someone.",
                );
            } else if (!args[0]) {
                // check if there was a first arg
                message.channel.send("You have to enter a user to mute.");
            } else if (!args[1]) {
                // check if there was a second arg
                message.channel.send("Enter a mute duration.");
            } else if (!args[2]) {
                // check if there was a second arg
                message.channel.send("Enter a mute reason.");
            } else {
                const muted =
                    message.mentions.members.first() ||
                    message.guild.members.cache.get(args[0]);
                const muter = message.author.tag;
                const reason = args.slice(2).join(" ");

                // if the muted user exists
                if (muted) {
                    // check if the user about to me muted has kick and ban permissions, and if the message author has admin permissions
                    if (
                        muted.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) &&
                        !message.member.hasPermission("ADMINISTRATOR")
                    ) {
                        message.channel.send("You can't mute that person.");
                    } else {
                        // have to create a custom muted role and add the id here
                        const mutedRole = message.guild.roles.cache.find(
                            (x) => x.name.toLowerCase() === "muted",
                        );

                        // if the role exists
                        if (mutedRole) {
                            muted.roles
                                .add(mutedRole)
                                .catch((err) =>
                                    message.channel.send(err.message),
                                );

                            // create an embed with the mute info and send it to the mod-logs channel
                            message.channel.send({
                                embed: {
                                    color: "GREEN",
                                    description: `${
                                        muted.username || muted.user.username
                                    } has been muted for ${
                                        args[1]
                                    } | ${reason}`,
                                },
                            });
                            setTimeout(() => {
                                muted.roles
                                    .remove(mutedRole)
                                    .catch((err) =>
                                        message.channel.send(err.message),
                                    );
                            }, ms(args[1]));
                        } else {
                            message.channel.send("Can't find the muted role.");
                        }
                    }
                } else {
                    message.channel.send("Member not found.");
                }
            }
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
