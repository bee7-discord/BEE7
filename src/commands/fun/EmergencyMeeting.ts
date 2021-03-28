import { MessageAttachment } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class CarReverseCommand extends CustomCommand {
    public constructor() {
        super("emergencymeeting", {
            aliases: ["emergencymeeting", "em"],
            category: "Fun",
            description: {
                content:
                    "Generate a emergency meeting meme. Example: https://beatzoid.is-inside.me/ZKGxin3s.png",
                usage: "emergencymeeting <text here>",
                examples: [
                    "emergencymeeting When you're friend is sad and you come up with a way to make him happy",
                ],
            },
            args: [
                {
                    id: "text",
                    type: "string",
                    match: "rest",
                    default: null,
                },
            ],
        });
    }

    public async exec(
        message: Message,
        { text }: { text: string }
    ): Promise<Message> {
        if (!text)
            return message.channel.send(
                "Incorrect usage! `emergencymeeting <text here>`"
            );

        await message.react(this.client.config.emojis.loadingEmoji);
        const buffer = await this.client.vacefron.emergencyMeeting(text);
        await message.reactions.removeAll();

        return message.channel.send(
            new MessageAttachment(buffer, "emergency-meeting.png")
        );
    }
}
