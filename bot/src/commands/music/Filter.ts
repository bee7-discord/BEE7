import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

const FiltersList = {
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

export default class FilterCommand extends CustomCommand {
    public constructor() {
        super("filter", {
            aliases: ["filter"],
            category: "Music",
            description: {
                content:
                    "Apply or remove a filter to the currently playing song",
                usage: "filter",
                examples: ["filter bassboost", "filter vaporwave"]
            },
            args: [
                {
                    id: "filter",
                    type: "string",
                    default: null
                }
            ],
            ratelimit: 3
        });
    }

    public async exec(
        message: Message,
        { filter }: { filter: string }
    ): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            message.channel.send("No music currently playing!");
        }

        if (!voice) {
            message.channel.send(
                "You must be in a voice channel to use this command!"
            );
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            message.channel.send(
                "You must be in the same voice channel as me!"
            );
        }

        if (!filter)
            return message.channel.send(
                "You must specify a filter! `filter <filter name>`"
            );

        const filterToUpdate = Object.values(FiltersList).find(
            (f) => f.toLowerCase() === filter.toLowerCase()
        );

        if (!filterToUpdate) return message.channel.send("Unknown filter!");

        const filterRealName = Object.keys(FiltersList).find(
            // @ts-ignore
            (f) => FiltersList[f] === filterToUpdate
        );

        const queueFilters = this.client.player.getQueue(message).filters;
        const filtersUpdated = {};
        // @ts-ignore
        filtersUpdated[filterRealName] = queueFilters[filterRealName]
            ? false
            : true;
        // @ts-ignore
        this.client.player.setFilters(message, filtersUpdated);

        // @ts-ignore
        if (filtersUpdated[filterRealName])
            message.channel.send(`Applying filter ${filter}`);
        else message.channel.send(`Removing filter ${filter}`);
    }
}
