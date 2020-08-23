const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "nick",
            description: "Change someone's nickname",
            usage: "nick <user mention or id> <new nickname>",
            category: "Moderation",
            permission: "MANAGE_MEMBERS"
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
            if (!args[0]) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Please provide either a user mention or id!`
                        )
                );
            }

            // Get the user
            const user =
                message.guild.members.cache.get(args[0]) ||
                message.mentions.members.first();

            if (!user)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} I couldn't find that user!`
                        )
                );

            if (!args[1]) {
                await user.setNickname(user.user.username).catch((err) => {
                    return this.client.utils.handleError(err, message);
                });
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.success)
                        .setDescription(
                            `${this.client.emoji.success} Reset ${user.user.username}'s nickname!`
                        )
                );
            }

            // Set the nickname
            await user.setNickname(args.slice(1).join(" ")).catch((err) => {
                return this.client.utils.handleError(err, message);
            });

            // Return a message saying nickname was changed
            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setDescription(
                        `${this.client.emoji.success} Set **${
                            user.user.username
                        }'s** nickname to **${args.slice(1).join(" ")}**`
                    )
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
