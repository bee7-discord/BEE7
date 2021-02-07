import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("ping", {
            aliases: ["ping", "pong"],
            category: "Info",
            description: {
                content: "Check the current ping of the bot",
                usage: "ping",
                examples: ["ping"],
            },
            ratelimit: 3,
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(`Pong! \`${this.client.ws.ping}ms\``);
    }
}
