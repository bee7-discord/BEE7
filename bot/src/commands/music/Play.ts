import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Util from "../../classes/Util";

export default class PlayCommand extends CustomCommand {
    public constructor() {
        super("play", {
            aliases: ["play", "p"],
            category: "Music",
            description: {
                content: "Play a song from Youtube!",
                usage: "play <song name or URL>",
                examples: [
                    "play Wish I knew you",
                    "play https://www.youtube.com/watch?v=j5a0jTc9S10",
                ],
            },
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "rest",
                    default: null,
                },
            ],
            ratelimit: 3,
        });
    }

    public async exec(
        message: Message,
        { song }: { song: string }
    ): Promise<Message> {
        const voice = message.member.voice.channel;

        if (!voice) {
            return message.channel.send(
                Util.errorEmbed({
                    description:
                        "You must be in a voice channel to use this command!",
                })
            );
        }

        if (!song)
            return message.channel.send(
                Util.errorEmbed({
                    description:
                        "You must specify a song name or url for me to play | `play <song name or URL>`",
                })
            );

        this.client.player.play(message, song);
    }
}
