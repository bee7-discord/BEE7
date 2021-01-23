import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import { FieldsEmbed } from "discord-paginationembed";
import { MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";

export default class QueueCommand extends CustomCommand {
    public constructor() {
        super("queue", {
            aliases: ["queue", "q"],
            category: "Music",
            description: {
                content: "Get the queue of the current server",
                usage: "queue",
                examples: ["queue"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        const voice = message.member.voice.channel;
        if (!voice) {
            return message.channel.send(
                "You must be connected to a voice channel for this command to work!"
            );
        }

        const queue = this.client.player.getQueue(message);

        if (!queue) {
            return message.channel.send("No music currently playing!");
        }

        if (queue.tracks.length === 1) {
            const embed = new MessageEmbed()
                .setColor(this.client.config.transparentColor)
                .setAuthor("Queue", message.guild.iconURL({ dynamic: true }))
                .addField(
                    "Currently Playing",
                    `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`
                );
            return message.channel.send(embed);
        }
        let i = 0;

        const FieldEmbed = new FieldsEmbed();

        FieldEmbed.embed
            .setColor(this.client.config.transparentColor)
            .setAuthor(
                "Current queue",
                message.guild.iconURL({ dynamic: true })
            )
            .addField(
                "Currently Playing",
                `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`
            );

        FieldEmbed.setArray(
            queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : []
        )
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel as TextChannel)
            .setElementsPerPage(5)
            .setPageIndicator(true)
            .formatField(
                "Queue",
                (track: any) =>
                    `${++i}. [${track.title}](${track.url})\n*Requested by ${
                        track.requestedBy
                    }*\n`
            );

        FieldEmbed.build();
    }
}
