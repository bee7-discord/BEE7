const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const warns = require("../../models/warns");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "warn",
            description: "Warn a user",
            usage: "warn <user mention or id> <reason>",
            category: "Moderation",
            permission: "MANAGE_MESSAGES"
        });
    }

    /**
     *
     * @param {Message} message - The message of the command
     * @param {String[]} args - The arguments of the command
     */

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        try {
            // Get the user
            const user = message.guild.member(
                message.mentions.users.first() ||
                    message.guild.members.cache.get(args[0])
            );

            if (!user) {
                return message.channel.send(
                    `You did not mention a user or provide a id!`
                );
            }

            if (user.user.username === message.member.user.username)
                return message.channel.send(
                    new MessageEmbed()
                        .setDescription(
                            `${this.client.emoji.error.toString()} You can't warn yourself!`
                        )
                        .setColor(this.client.colors.error)
                );

            if (
                user.roles.highest.position >
                    message.member.roles.highest.position ||
                user.roles.highest.position ===
                    message.member.roles.highest.position
            )
                return message.channel.send(
                    new MessageEmbed()
                        .setDescription(
                            `${this.client.emoji.error.toString()} You can't warn that person because they have the same or a higher role than you!`
                        )
                        .setColor(this.client.colors.error)
                );

            // If there is no user, return a message
            // If there is no reason, return message
            if (!args.slice(1).join(" ")) {
                return message.channel.send(`You must provide a reason!`);
            }

            // Find one entry in the warns database, where the guild id is the message guild id and the user id is the user id of the person getting warned
            warns.findOne(
                { Guild: message.guild.id, User: user.id },
                async (err, data) => {
                    if (err) console.log(err);
                    if (!data) {
                        const newWarns = new warns({
                            User: user.id,
                            Guild: message.guild.id,
                            Warns: [
                                {
                                    Moderator: message.author.id,
                                    Reason: args.slice(1).join(" ")
                                }
                            ]
                        });
                        newWarns.save();
                        message.channel.send(
                            new MessageEmbed()
                                .setDescription(
                                    `${this.client.emoji.success.toString()} ${
                                        user.user.tag
                                    } has been warned. Reason: \`${args
                                        .slice(1)
                                        .join(" ")}\` They now have \`1\` warn.`
                                )
                                .setColor(this.client.colors.success)
                        );
                    } else {
                        data.Warns.unshift({
                            Moderator: message.author.id,
                            Reason: args.slice(1).join(" ")
                        });
                        data.save();
                        message.channel.send(
                            new MessageEmbed()
                                .setDescription(
                                    `${this.client.emoji.success.toString()} ${
                                        user.user.tag
                                    } has been warned. Reason: \`${args
                                        .slice(1)
                                        .join(" ")}\` They now have \`${
                                        data.Warns.length
                                    }\` warns.`
                                )
                                .setColor(this.client.colors.success)
                        );
                    }
                }
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
