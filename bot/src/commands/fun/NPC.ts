import { MessageAttachment } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class ImposterCommand extends CustomCommand {
    public constructor() {
        super("npc", {
            aliases: ["npc"],
            category: "Fun",
            description: {
                content:
                    "Generate a npc meme. Make sure to separate the values with a | Example: https://beatzoid.is-inside.me/YD3IX20x.png",
                usage: "npc <Gray Guy Text> <White Guy Text>",
                examples: [
                    "npc BEE7 is an amazing bot | Then why don't you add it to your server"
                ]
            },
            args: [
                {
                    id: "text",
                    match: "rest",
                    default: null
                }
            ],
            ratelimit: 3
        });
    }

    public async exec(
        message: Message,
        { text }: { text: any }
    ): Promise<Message> {
        if (!text) {
            return message.channel.send(
                "Not enough arguments! `npc <Gray Guy Text> <White Guy Text>`"
            );
        }
        let values = text.split("|");
        values = values.map((value: string) => value.trim());

        if (values.length < 2)
            return message.channel.send(
                "Not enough arguments! `npc <Gray Guy Text> | <White Guy Text>`"
            );

        await message.react(this.client.config.emojis.loadingEmoji);
        const buffer = await this.client.vacefron.npc(values[0], values[1]);
        await message.reactions.removeAll();

        return message.channel.send(new MessageAttachment(buffer, "npc.png"));
    }
}
