const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "support",
            description: "Get the invite to BEE7's support server!",
            usage: "support",
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
                "**Join this server to report bugs and/or suggest new features for the bot!**\nhttps://discord.gg/AunkyAe"
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
