const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "skip",
            description: "Skip the current song",
            usage: "skip",
            category: "Music",
            aliases: ["s"]
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
                            `${this.client.emoji.error} No music playing on this server`
                        )
                );

            // eslint-disable-next-line no-unused-vars
            const track = await this.client.player.skip(message.guild.id);

            //Message
            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.colors.success)
                    .setDescription(`${this.client.emoji.success} Skipped!`)
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
