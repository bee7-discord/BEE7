const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            description: "Ban a member",
            usage: "ban <user mention or id> <reason>",
            category: "Moderation",
            permission: "BAN_MEMBERS"
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
            const user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);

            if (!user)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error.toString()} Please mention someone or provide a user id!`
                        )
                );

            if (!args[1])
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Please provide a reason!`
                        )
                );

            if (!user.bannable)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} I can't ban that person!`
                        )
                );

            user.ban({ reason: args.slice(1).join(" ") });

            user.send(
                `You have been banned from \`${
                    message.guild.name
                }\` for \`${args.slice(1).join(" ")}\``
            ).catch((err) =>
                message.channel.send(
                    `I tried to dm the user but encountered this error: ${err.message}`
                )
            );

            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setDescription(
                        `${this.client.emoji.success} ${user.user.username} was successfully banned!`
                    )
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
