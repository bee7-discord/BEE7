const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "pause",
            description: "Pause the music",
            usage: "pause",
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
            if (!message.member.voice.channel)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | You must be in a voice channel!`
                    }
                });

            if (
                message.guild.me.voice.channel &&
                message.member.voice.channel.id !==
                    message.guild.me.voice.channel.id
            )
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | You are not in my voice channel!`
                    }
                });

            if (!this.client.player.isPlaying(message.guild.id))
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | There is nothing playing!`
                    }
                });

            // eslint-disable-next-line no-unused-vars
            const song = await this.client.player.pause(message.guild.id);

            return message.channel.send({
                embed: {
                    color: this.client.colors.success,
                    description: `${this.client.emoji.pause} | Paused!`
                }
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
