const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "yeet",
            description: "Play the yeet sound effect",
            usage: "yeet",
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
            if (!channel) {
                return message.channel.send("Please join a voice channel!");
            }

            channel.join().then((connection) => {
                const dispatcher = connection.play(
                    `${process.cwd()}/soundboard_sounds/yeet.mp3`
                );
                message.channel.send(
                    `${this.client.emoji.playing} | Now playing the yeet sound effect in voice channel \`${connection.channel.name}\``
                );

                dispatcher.on("speaking", (speaking) => {
                    if (!speaking) channel.leave();
                });
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};