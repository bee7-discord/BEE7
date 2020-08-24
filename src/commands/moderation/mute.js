const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const humanizeDuration = require("humanize-duration");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "mute",
            description: "Mute a user",
            usage: "mute <user mention or id> <time> <reason>",
            category: "Moderation",
            permission: ""
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
            if (!args[0] || !args[1] || !args[2])
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} The correct usage for this command is \`mute <user mention or id> <time> <reason>\``
                        )
                );

            const muted =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);

            // if the muted user exists
            if (muted) {
                // check if the user about to me muted has kick and ban permissions, and if the message author has admin permissions
                if (muted.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(this.client.colors.error)
                            .setDescription(
                                `${this.client.emoji.error} That person has either the \`KICK_MEMBERS\` or \`BAN_MEMBERS\` permission, you can't mute them`
                            )
                    );
                } else {
                    // have to create a custom muted role and add the id here
                    const mutedRole = message.guild.roles.cache.find((x) =>
                        x.name.toLowerCase().includes("muted")
                    );

                    // if the role exists
                    if (mutedRole) {
                        muted.roles.add(mutedRole).catch((err) => {
                            return this.client.utils.handleError(err, message);
                        });

                        // create an embed with the mute info and send it to the mod-logs channel
                        message.channel.send({
                            embed: {
                                color: this.client.colors.success,
                                description: `${this.client.emoji.success} ${
                                    muted.username || muted.user.username
                                } has been muted for ${humanizeDuration(
                                    ms(args[1])
                                )}`
                            }
                        });

                        setTimeout(() => {
                            muted.roles.remove(mutedRole).catch((err) => {
                                return this.client.utils.handleError(
                                    err,
                                    message
                                );
                            });
                        }, ms(args[1]));
                    } else {
                        message.channel.send(
                            new MessageEmbed()
                                .setColor(this.client.colors.error)
                                .setDescription(
                                    `${this.client.emoji.error} Couldn't find the muted role`
                                )
                        );
                    }
                }
            } else {
                message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} I couldn't find that user`
                        )
                );
            }
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
