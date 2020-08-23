const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "unban",
            description: "Unban a user!",
            usage: "unban <user mention or id> <reason>",
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
            if (!args[0]) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error.toString()} Please provide a user id!`
                        )
                );
            }

            const user = await this.client.users.fetch(args[0]);

            const reason = args.slice(1).join(" ");

            if (!args[1])
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Please provide a reason!`
                        )
                );

            message.guild.members
                .unban(args[0], reason)
                .catch((err) => this.client.utils.handleError(err, message));

            await user
                .send(
                    `You have been unbanned from ${message.guild.name} for ${reason}`
                )
                .catch((err) =>
                    message.channel.send(
                        `I tried to dm the user but encountered this error: ${err.message}`
                    )
                );

            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setDescription(
                        `${this.client.emoji.success} ${user.username} was successfully unbanned!`
                    )
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
