const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "deepfry",
            description: "Deepfry a users avatar!",
            usage: "deepfry [user mention]",
            category: "Fun"
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
            const msg = await message.channel.send(
                this.client.emoji.loading.toString()
            );

            const member = message.mentions.members.first() || message.member;

            const image = await this.client.canva.deepfry(
                member.user.displayAvatarURL({
                    format: "png",
                    size: 4096
                })
            );

            await message.channel.send(
                new MessageAttachment(image, "deepfry.png")
            );

            msg.delete();
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
