import { MessageAttachment } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class CarReverseCommand extends CustomCommand {
    public constructor() {
        super("carreverse", {
            aliases: ["carreverse", "cr"],
            category: "Fun",
            description: {
                content:
                    "Generate a car reverse meme. Example: https://beatzoid.is-inside.me/UvyPcbhm.png",
                usage: "carreverse <text here>",
                examples: ["carreverse You must pay to view this article"],
            },
            args: [
                {
                    id: "text",
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
        { text }: { text: string }
    ): Promise<Message> {
        if (!text)
            return message.channel.send(
                "Incorrect usage! `carreverse <text here>`"
            );

        await message.react(this.client.config.emojis.loadingEmoji);
        const buffer = await this.client.vacefron.carReverse(text);
        await message.reactions.removeAll();

        return message.channel.send(
            new MessageAttachment(buffer, "car-reverse.png")
        );
    }
}
