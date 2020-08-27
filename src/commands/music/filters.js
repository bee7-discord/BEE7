const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

const filters = {
    bassboost: "Bassboost",
    "8D": "8D",
    vaporwave: "Vaporwave",
    nightcore: "Nightcore",
    phaser: "Phaser",
    tremolo: "Tremolo",
    vibrato: "Vibrato",
    reverse: "Reverse",
    treble: "Treble",
    normalizer: "Normalizer",
    surrounding: "Surrounding",
    pulsator: "Pulsator",
    superequalizer: "Superequalizer"
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "filters",
            description: "Get a list of filters",
            usage: "filters",
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
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | You are not in my voice channel!`
                    }
                });

            //If there's no music
            if (!this.client.player.isPlaying(message.guild.id))
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | There is nothing playing!`
                    }
                });
            //Emojis
            const enabledEmoji = "✅";
            const disabledEmoji = "❌";

            const filtersStatuses = [[], []];

            Object.keys(filters).forEach((filterName) => {
                const array =
                    filtersStatuses[0].length > filtersStatuses[1].length
                        ? filtersStatuses[1]
                        : filtersStatuses[0];

                array.push(
                    filters[filterName] +
                        " : " +
                        (this.client.player.getQueue(message.guild.id).filters[
                            filterName
                        ]
                            ? enabledEmoji
                            : disabledEmoji)
                );
            });

            //List embed
            const list = new MessageEmbed()
                .setDescription(
                    "List of all filters enabled or disabled.\nTo add/remove a filter do `filter <filter name>`!"
                )
                .addField("**Filters**", filtersStatuses[0].join("\n"), true)
                .addField("** **", filtersStatuses[1].join("\n"), true)
                .setColor(this.client.colors.transparent);

            //Message
            message.channel.send(list);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
