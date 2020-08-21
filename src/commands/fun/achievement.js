const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "achievement",
            description: "Generate a Minecraft achievement",
            usage: "achievement <text>",
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

            // Fetch data from a api, and send the image
            if (!args[0]) return message.channel.send("Provide some text");
            const image = await this.client.alexclient.image.achievement({
                text: args.join(" ")
            });

            message.channel.send(
                new MessageAttachment(image, "achievement.png")
            );
            msg.delete();
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
