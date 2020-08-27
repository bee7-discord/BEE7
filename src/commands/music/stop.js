const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "stop",
            description: "Stop the music",
            usage: "stop",
            category: "Music"
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
            //If the member is not in a voice channel
            if (!message.member.voice.channel)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} You're not in a voice channel!`
                        )
                );

            //If there's no music
            if (!this.client.player.isPlaying(message.guild.id))
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} No music playing!`
                        )
                );

            //Stop player
            this.client.player.stop(message.guild.id);

            //Message
            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setDescription(
                        `${this.client.emoji.success} Music stopped!`
                    )
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
