import { MessageEmbed } from "discord.js";
import { User } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class SkipCommand extends CustomCommand {
    public constructor() {
        super("skip", {
            aliases: ["skip"],
            category: "Music",
            description: {
                content: "Skip the currently playing song",
                usage: "skip",
                examples: ["skip"],
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);
        const voice = message.member.voice.channel;

        if (!queue) {
            return message.error("NO_MUSIC_PLAYING");
        }

        if (!voice) {
            return message.error("NO_VOICE_CHANNEL");
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.error("SAME_VOICE_CHANNEL");
        }

        if (!queue.tracks[1]) {
            return message.channel.send(
                "You cannot skip as there are no more songs left in the queue"
            );
        }

        const members = voice.members.filter((m) => !m.user.bot);

        if (members.size > 1) {
            const embed = new MessageEmbed()
                .setAuthor("Skip Vote")
                .setThumbnail(queue.tracks[1].thumbnail)
                .setColor(this.client.config.transparentColor);

            const m = await message.channel.send(embed);

            m.react("👍");

            const mustVote = Math.floor(members.size / 2 + 1);

            embed.setDescription(
                `Next song: ${queue.tracks[1].title}\nReact with 👍 to skip the music! ${mustVote} more votes are required.`
            );
            m.edit(embed);

            const filter = (_: any, user: User) => {
                const member = message.guild.members.cache.get(user.id);
                const voiceChannel = member.voice.channel;
                if (voiceChannel) {
                    return voiceChannel.id === voice.id;
                }
            };

            const collector = m.createReactionCollector(filter, {
                time: 25000,
            });

            collector.on("collect", (reaction) => {
                const haveVoted = reaction.count - 1;
                if (haveVoted >= mustVote) {
                    this.client.player.skip(message);
                    embed.setDescription("Song skipped!");
                    m.edit(embed);
                    collector.stop("true");
                } else {
                    embed.setDescription(
                        `Next song: ${
                            queue.tracks[1].title
                        }\nReact with 👍 to skip the music! ${
                            mustVote - haveVoted
                        } more votes are required.`
                    );
                    m.edit(embed);
                }
            });

            collector.on("end", (_, isDone) => {
                if (!isDone) {
                    return message.channel.send(
                        "Times up, skipping has been cancelled"
                    );
                }
            });
        } else {
            this.client.player.skip(message);
            message.channel.send("Song skipped");
        }
    }
}
