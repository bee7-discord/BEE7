const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "snipe",
            description: "See recently deleted messages!",
            usage: "snipe",
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
            const msg = this.client.snipes.get(message.channel.id);
            if (!msg) return message.reply("No recently deleted messages!");

            const embed = new MessageEmbed()
                .setAuthor(
                    `Sent by ${msg.author.tag}`,
                    msg.author.displayAvatarURL()
                )
                .setDescription(msg.content)
                .setColor("#2f3136");

            if (msg.image) embed.setImage(msg.image);

            message.channel.send(embed);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
