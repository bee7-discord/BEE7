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
            name: "filter",
            description: "Apply filters to the music",
            usage: "filter <filter name>",
            category: "Music",
            cooldown: 10000
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
                            `${this.client.emoji.error} You're not in a voice channel`
                        )
                );

            //If there's no music
            if (!this.client.player.isPlaying(message.guild.id))
                return message.channel.send({
                    embed: {
                        color: this.client.colors.error,
                        description: `${this.client.emoji.error} | No music playing!`
                    }
                });

            //Filter
            const filter = args[0];
            if (!filter)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Please specify a valid filter to enable or disable`
                        )
                );

            const filterToUpdate = Object.values(filters).find(
                (f) => f.toLowerCase() === filter.toLowerCase()
            );

            //If he can't find the filter
            if (!filterToUpdate)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} That filter doesn't exist! Use the \`filters\` command to see all possible filters`
                        )
                );

            const filterRealName = Object.keys(filters).find(
                (f) => filters[f] === filterToUpdate
            );

            const queueFilters = this.client.player.getQueue(message.guild.id)
                .filters;

            // Due to a weird bug that crashes the whole bot I had to add this
            if (
                Object.values(queueFilters).filter((x) => x).length + 1 > 3 &&
                !queueFilters[filterRealName]
            )
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(this.client.colors.error)
                        .setDescription(
                            `${this.client.emoji.error} Due to a bug that I am working to fix ASAP, there is a limit of 3 filters. Sorry!`
                        )
                );

            const filtersUpdated = {};

            filtersUpdated[filterRealName] = queueFilters[filterRealName]
                ? false
                : true;

            this.client.player
                .setFilters(message.guild.id, filtersUpdated)
                .catch((e) => this.client.utils.handleError(e, message));

            if (filtersUpdated[filterRealName]) {
                //The bot adds the filter on the music
                message.channel.send(
                    `${this.client.emoji.music} I'm adding the filter to the music, please wait... Note : the longer the music is, the longer the wait will be`
                );
            } else {
                //The bot removes the filter from the music
                message.channel.send(
                    `${this.client.emoji.music} I'm disabling the filter on the music, please wait... Note : the longer the music is playing, the longer the wait will be`
                );
            }
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
