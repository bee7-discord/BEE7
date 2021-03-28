import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class LyricsCommand extends CustomCommand {
    public constructor() {
        super("lyrics", {
            aliases: ["lyrics"],
            category: "Music",
            description: {
                content: "Get the lyrics of the currently playing song",
                usage: "lyrics",
                examples: ["lyrics"],
            },
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(
            "This is one of the commands I need ksoft for"
        );
    }
}
