import { MessageEmbed } from "discord.js";
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
    superequalizer: "Superequalizer",
};

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("filters", {
            aliases: ["filters"],
            category: "Music",
            description: {
                content:
                    "Get a list of filters you can use to filter the music",
                usage: "ping",
                examples: ["ping"],
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.channel.send("No music currently playing!");
        }

        if (!voice) {
            return message.channel.send(
                "You must be in a voice channel to use this command!"
            );
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.channel.send(
                "You must be in the same voice channel as me!"
            );
        }

        const filtersStatuses: any = [[], []];

        Object.keys(FiltersList).forEach((filterName) => {
            const array =
                filtersStatuses[0].length > filtersStatuses[1].length
                    ? filtersStatuses[1]
                    : filtersStatuses[0];
            array.push(
                // @ts-ignore
                FiltersList[filterName] +
                    " : " +
                    // @ts-ignore
                    (this.client.player.getQueue(message).filters[filterName]
                        ? "✅"
                        : "❌")
            );
        });

        const list = new MessageEmbed()
            .setDescription(`To apply a filter run \`filter <filter name>\``)
            .addField("**Filters**", filtersStatuses[0].join("\n"), true)
            .addField("** **", filtersStatuses[1].join("\n"), true)
            .setFooter(
                "Please don't apply all of these at the same time, it puts a lot of stress on my VPS/PC"
            )
            .setColor(this.client.config.transparentColor);

        return message.channel.send(list);
    }
}
