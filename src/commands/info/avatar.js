const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "avatar",
            description: "Get a users avatar",
            usage: "avatar [user id or mention]",
            category: "Info"
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
            const embed = new MessageEmbed();
            // Get either the mention, the id, or the message author and send their avatar in a embed
            const member =
                message.mentions.members.last() ||
                message.guild.members.cache.get(args[0]) ||
                message.member;

            embed.setTitle(`${member.user.username}'s Avatar`);
            embed.setImage(
                member.user.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 4096
                })
            );
            embed.setColor("#2f3136");
            return message.channel.send(embed);
            // eslint-disable-next-line brace-style
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
