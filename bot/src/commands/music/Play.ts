import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

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
                    "play https://www.youtube.com/watch?v=j5a0jTc9S10"
                ]
            },
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "rest",
                    default: null
                }
            ],
            ratelimit: 3
        });
    }

    public exec(
        message: Message,
        { song }: { song: string }
    ): Promise<Message> {
        if (!song)
            return message.channel.send(
                "You must specify a song for me to play!"
            );

        this.client.player.play(message, song);
    }
}
