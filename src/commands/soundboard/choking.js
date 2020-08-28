const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "choking",
            description: "Play the are you choking sound effect",
            usage: "choking",
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
            const { channel } = message.member.voice;

            if (!channel)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | You must be in a voice channel!`
                    }
                });

            channel.join().then((connection) => {
                const dispatcher = connection.play(
                    `${process.cwd()}/soundboard_sounds/are-you-choking.mp3`
                );

                message.channel.send(
                    `${this.client.emoji.playing} | Now playing the choking sound effect in voice channel \`${connection.channel.name}\``
                );

                dispatcher.on("speaking", (speaking) => {
                    if (!speaking) connection.disconnect();
                });
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
