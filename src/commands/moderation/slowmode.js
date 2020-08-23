const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");
const ms = require("ms");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "slowmode",
            description: "Set the current channels slowmode",
            usage: "slowmode <number>",
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
            // If there are no args, send the current slowmode
            if (!args[0]) {
                return message.channel.send(
                    `Current slowmode: **${humanizeDuration(
                        message.channel.rateLimitPerUser * 1000
                    )}**`
                );
            }
            // if the slowmode is too big, send a message
            if (ms(args[0]) >= 21600) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Please set the slowmode to something smaller!`
                        )
                );
            }

            // Set the slowmode
            message.channel.setRateLimitPerUser(
                ms(args[0]),
                `Slowmode command used by ${message.author.username} (${message.author.id})`
            );

            // Send a message to the channel
            message.channel.send(
                `Changed slowmode to **${humanizeDuration(args[0] * 1000)}**`
            );
            // eslint-disable-next-line brace-style
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
