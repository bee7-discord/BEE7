const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "captcha",
            description: "Generate a custom google captcha image",
            usage: "captcha <text>",
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
            if (!args[0]) return message.channel.send("Provide some text!");

            const msg = await message.channel.send(
                this.client.emoji.loading.toString()
            );

            const image = await this.client.alexclient.image.captcha({
                text: args.join(" ")
            });
            await message.channel.send(
                new MessageAttachment(image, "wooosh.png")
            );
            msg.delete();
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
