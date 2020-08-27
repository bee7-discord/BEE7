const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "queue",
            description: "Get the current queue!",
            usage: "queue",
            category: "Music",
            aliases: ["q"]
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

            let queue = this.client.player.getQueue(message.guild.id);

            if (!queue)
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | There is nothing playing!`
                    }
                });

            message.channel.send(
                new MessageEmbed()
                    .setColor("0x00FF46")
                    .setDescription(
                        `**Current:** ${queue.playing.name} by ${
                            queue.playing.author
                        }\n\n**Upcoming:**\n${
                            queue.tracks.length
                                ? `${queue.tracks
                                      .map(
                                          (x, i) =>
                                              `**${i + 1}** | ${x.name} by ${
                                                  x.author
                                              }`
                                      )
                                      .join("\n")}`
                                : "None"
                        }`
                    )
                    .setThumbnail(`${queue.playing.thumbnail}.png`)
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
