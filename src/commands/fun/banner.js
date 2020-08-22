const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const figlet = require("util").promisify(require("figlet"));

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "banner",
            description: "Turn text into ascii art/banner",
            usage: "banner <text>",
            category: "Fun"
        });
    }

    /**
     *
     * @param {Message} message - The message of the command
     * @param {String[]} args - The arguments of the command
     */

    // eslint-disable-next-line no-unused-vars
    async run(message, ...banner) {
        try {
            console.log(banner);
            if (!banner[0].length)
                return message.channel.send("Please provide some text");

            return message.channel.send(await figlet(banner[0].join(" ")), {
                code: true
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
