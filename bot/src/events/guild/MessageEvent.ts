import { Message } from "discord.js";
import Listener from "../../classes/Listener";

export default class ReadyEvent extends Listener {
    public constructor() {
        super("message", {
            emitter: "client",
            event: "message",
            category: "client",
        });
    }

    public async exec(message: Message): Promise<void> {
        if (message.author.bot || !message.guild || !message.guild.available)
            return;
        // Do something
    }
}
