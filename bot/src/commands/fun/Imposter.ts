import { MessageAttachment } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Util from "../../classes/Util";

export default class ImposterCommand extends CustomCommand {
    public constructor() {
        super("imposter", {
            aliases: ["imposter"],
            category: "Fun",
            description: {
                content:
                    "Generate a imposter meme. Make sure to separate the values with a | Example: https://beatzoid.is-inside.me/ToSX7Sxv.png",
                usage:
                    "imposter <Name of user being ejected> | <Whether or not they were imposter> | [Color of crewmate]",
                examples: ["imposter Beatzoid | true | Red"],
            },
            args: [
                {
                    id: "text",
                    match: "rest",
                    default: null,
                },
            ],
            ratelimit: 3,
        });
    }

    public async exec(
        message: Message,
        { text }: { text: any }
    ): Promise<Message> {
        if (!text) {
            return message.channel.send(
                "Not enough arguments! `imposter <Name of user being ejected> | <Whether or not they were imposter> | [Color of crewmate]`"
            );
        }
        let values = text.split("|");
        values = values.map((value: string) => value.trim());

        if (values.length < 2)
            return message.channel.send(
                "Not enough arguments! `imposter <Name of user being ejected> | <Whether or not they were imposter> | [Color of crewmate(optional)]`"
            );

        await message.react(this.client.config.emojis.loadingEmoji);
        const buffer = await this.client.vacefron.ejected(
            values[0],
            Util.getBoolean(values[1]),
            values[2] || undefined
        );
        await message.reactions.removeAll();

        return message.channel.send(
            new MessageAttachment(buffer, "ejected.png")
        );
    }
}
