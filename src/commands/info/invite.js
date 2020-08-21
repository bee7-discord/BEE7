const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "invite",
            description: "Get the invite to the bot",
            usage: "invite",
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
            message.channel.send(
                new MessageEmbed()
                    .setTitle("Invite the bot")
                    .setDescription(
                        "Click [here](https://discord.com/api/oauth2/authorize?client_id=718621799499300936&permissions=8&scope=bot 'Click here to invite me!') to invite the bot!"
                    )
                    .setColor("#2f3136")
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
