const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "play",
            description: "Play some music",
            category: "Music",
            usage: "play <song name or URL>"
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
            // Search for tracks
            if (!message.member.voice.channel)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | You must be in a voice channel to play!`
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

            let tracks = args.join(" ");

            if (!tracks)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | Please enter a query to search!`
                    }
                });

            const searchTracks = await this.client.player
                .searchTracks(tracks)
                .catch(() => {
                    return message.channel.send({
                        embed: {
                            color: this.client.colors.error,
                            description: `${this.client.emoji.error} | No results found!`
                        }
                    });
                });

            if (searchTracks.length < 1)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | No results found!`
                    }
                });

            let track = searchTracks[0];

            if (this.client.player.isPlaying(message.guild.id)) {
                // Add the song to the queue
                let song = await this.client.player.addToQueue(
                    message.guild.id,
                    track,
                    message.member.user.tag
                );
                return message.channel.send({
                    embed: {
                        color: this.client.colors.success,
                        description: `${
                            this.client.emoji.success
                        } | ${Util.escapeMarkdown(
                            song.name
                        )} by ${Util.escapeMarkdown(
                            song.author
                        )}  added to the queue!`
                    }
                });
            } else {
                // Else, play the song
                let song = await this.client.player.play(
                    message.member.voice.channel,
                    track,
                    message.member.user.tag
                );
                message.channel.send({
                    embed: {
                        color: this.client.colors.success,
                        description: `${this.client.emoji.music} | Now Playing:\n${song.name}`
                    }
                });
                this.client.player.getQueue(message.guild.id).on("end", () => {
                    message.channel.send({
                        embed: {
                            color: this.client.colors.success,
                            description:
                                "Queue completed, add some more songs to play!"
                        }
                    });
                });

                this.client.player
                    .getQueue(message.guild.id)
                    .on(
                        "trackChanged",
                        (oldSong, newSong, skipped, repeatMode) => {
                            if (repeatMode) {
                                message.channel.send({
                                    embed: {
                                        color: this.client.colors.success,
                                        description: `${this.client.emoji.repeat} | Repeating:\n ${oldSong.name}`
                                    }
                                });
                            } else {
                                message.channel.send({
                                    embed: {
                                        color: this.client.colors.success,
                                        description: `${this.client.emoji.music} | Now Playing:\n ${newSong.name}`
                                    }
                                });
                            }
                        }
                    );
            }
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
