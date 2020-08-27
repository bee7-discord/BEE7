const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "lyrics",
            description:
                "Get the lyrics of the currently playing song OR a specified song",
            usage: "lyrics [song name]",
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
            let queue = this.client.player.getQueue(message.guild.id);
            if (!queue && !args[0]) {
                return message.channel.send(
                    "There is nothing playing so you must provide a song name!"
                );
            }
            if (queue) {
                const msg = await message.channel.send(
                    `${this.client.emoji.loading} Fetching lyrics please wait...`
                );

                const lyrics = await this.client.ksoft.lyrics.get(
                    queue.playing.name
                );

                if (lyrics.lyrics.length >= 2048) {
                    return (
                        message.channel.send(
                            `Lyrics too long! See them at: ${lyrics.url}`
                        ) && msg.delete()
                    );
                }

                (await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`Lyrics for ${lyrics.name}`)
                        .setDescription(lyrics.lyrics)
                        .setColor(this.client.colors.transparent)
                        .setImage(lyrics.artwork)
                        .setFooter("Powered by api.ksoft.si")
                )) && msg.delete();
            } else {
                const msg = await message.channel.send(
                    `${this.client.emoji.loading} Fetching lyrics please wait...`
                );

                const lyrics = await this.client.ksoft.lyrics.get(
                    args.join(" ")
                );
                if (lyrics.lyrics.length >= 2048) {
                    return (
                        message.channel.send(
                            `Lyrics too long! See them at: ${lyrics.url}`
                        ) && msg.delete()
                    );
                }

                (await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`Lyrics for ${lyrics.name}`)
                        .setDescription(lyrics.lyrics)
                        .setColor(this.client.colors.transparent)
                        .setImage(lyrics.artwork)
                        .setFooter("Powered by api.ksoft.si")
                )) && msg.delete();
            }
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
