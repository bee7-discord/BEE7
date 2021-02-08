import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import { FieldsEmbed } from "discord-paginationembed";
import { MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import { Track } from "discord-player";

export default class QueueCommand extends CustomCommand {
    public constructor() {
        super("queue", {
            aliases: ["queue", "q"],
            category: "Music",
            description: {
                content: "Get the queue of the current server",
                usage: "queue",
                examples: ["queue"],
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

        if (queue.tracks.length === 1) {
            const embed = new MessageEmbed()
                .setColor(this.client.config.transparentColor)
                .setAuthor("Queue", message.guild.iconURL({ dynamic: true }))
                .addField(
                    "Currently Playing",
                    `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`
                )
                .setFooter(
                    "To remove the currently playing song from the queue, run `remove 0`"
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
            )
            .setFooter(
                "To remove the currently playing song from the queue, run `remove 0`"
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
                (track: Track) =>
                    `${++i}. [${track.title}](${track.url})\n*Requested by ${
                        track.requestedBy
                    }*\n`
            );

        FieldEmbed.build();
    }
}
