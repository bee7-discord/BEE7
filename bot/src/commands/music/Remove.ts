import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class RemoveCommand extends CustomCommand {
    public constructor() {
        super("remove", {
            aliases: ["remove"],
            category: "Music",
            description: {
                content: "Remove a song from the queue",
                usage: "remove <number of song in queue>",
                examples: ["remove 3", "remove 5"]
            },
            args: [
                {
                    id: "track",
                    type: "number",
                    default: null
                }
            ],
            ratelimit: 3
        });
    }

    public exec(
        message: Message,
        { track }: { track: number }
    ): Promise<Message> {
        return message.channel.send(`Removing track #${track}`);
    }
}
