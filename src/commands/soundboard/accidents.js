const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "accidents",
            description: "Play the accidents sound effect",
            usage: "accidents",
            category: "Soundboard"
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
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
