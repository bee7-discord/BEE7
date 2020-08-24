const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "play",
            description: "Play some music",
            usage: "Music",
            category: "play <song name or URL>"
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
            let tracks = await this.client.player.searchTracks(args[0], true);

            // Sends an embed with the 10 first songs
            if (tracks.length > 5) tracks = tracks.slice(0, 5);
            const embed = new MessageEmbed()
                .setDescription(
                    tracks.map((t, i) => `**${i + 1} -** ${t.name}`).join("\n")
                )
                .setFooter("Send the number of the track you want to play!")
                .setColor(this.client.colors.transparent);

            message.channel.send(embed);
            // Wait for user answer
            await message.channel
                .awaitMessages((m) => m.content > 0 && m.content < 6, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                })
                .then(async (answers) => {
                    const index = parseInt(answers.first().content, 5);
                    let track = tracks[index - 1];

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
                                )}  Added to the queue!`
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
                        console.log(song);
                        this.client.player
                            .getQueue(message.guild.id)
                            .on("end", () => {
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
                                                color: this.client.colors
                                                    .success,
                                                description: `${this.client.emoji.repeat} | Repeating:\n ${oldSong.name}`
                                            }
                                        });
                                    } else {
                                        message.channel.send({
                                            embed: {
                                                color: this.client.colors
                                                    .success,
                                                description: `${this.client.emoji.music} | Now Playing:\n ${newSong.name}`
                                            }
                                        });
                                    }
                                }
                            );
                    }
                });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
