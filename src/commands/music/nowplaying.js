const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "nowplaying",
            description: "Get the currently playing song",
            usage: "nowplaying",
            category: "Music",
            aliases: ["np"]
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
            if (!this.client.player.isPlaying(message.guild.id))
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | There is nothing playing!`
                    }
                });

            let song = await this.client.player.nowPlaying(message.guild.id);

            message.channel.send({
                embed: {
                    color: this.client.colors.success,
                    description: `${this.client.emoji.music} | Now Playing:\n${song.name} requested by \`${song.requestedBy}\``
                }
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
