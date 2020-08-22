const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const warns = require("../../models/warns");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "warns",
            description: "Get a users warns",
            usage: "warns <user mention or id>",
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
            // Get the user, and if there is no user, return a message
            const user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);

            if (!user) {
                return message.channel.send("Please **mention** a user!");
            }
            // Find the warns of the user, and map it into a embed
            warns.find(
                { Guild: message.guild.id, User: user.id },
                async (err, data) => {
                    if (err) console.log(err);
                    if (!data.length) {
                        return message.channel.send(
                            `${user.user.tag} doesn't have any warns!`
                        );
                    }
                    const Embed = new MessageEmbed()
                        .setTitle(
                            `${user.user.tag}'s warning(s) in ${message.guild.name}`
                        )
                        .setColor("#2f3136")
                        .setDescription(
                            data.map((d) => {
                                return d.Warns.map(
                                    (w, i) =>
                                        `${
                                            i + 1
                                        } - Moderator: ${message.guild.members.cache.get(
                                            w.Moderator
                                        )} Reason: ${w.Reason}`
                                ).join("\n\n");
                            })
                        );
                    message.channel.send(Embed);
                }
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
