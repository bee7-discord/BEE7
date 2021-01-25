import { MessageAttachment } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class batmanslapCommand extends CustomCommand {
    public constructor() {
        super("batmanslap", {
            aliases: ["batmanslap", "bms"],
            category: "Fun",
            description: {
                content:
                    "Generate a batman slap. Make sure to separate the values with a | Example: https://beatzoid.is-inside.me/rFdFxtzk.png",
                usage:
                    "batmanslap <Robin's Text> | <Batman's Text> | <User mention or id for Robin's face>",
                examples: [
                    "batmanslap You are now breathing manually | NO! | <@671892057840943134>"
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
                "Not enough arguments! `batmanslap <Robin's Text> | <Batman's Text> | <User mention or id for Robin's face>`"
            );
        }
        const values = text.split("|");
        if (values.length < 3)
            return message.channel.send(
                "Not enough arguments! `batmanslap <Robin's Text> | <Batman's Text> | <User mention or id for Robin's face>`"
            );

        const user = values[2].includes("<@")
            ? message.mentions.members.first()
            : await message.guild.members.cache.get(values[2]);
        if (!user) return message.channel.send("Unknown user mentioned!");

        await message.react(this.client.config.emojis.loadingEmoji);
        const buffer = await this.client.vacefron.batmanSlap(
            values[0],
            values[1],
            message.author.displayAvatarURL(),
            user.user.displayAvatarURL()
        );
        await message.reactions.removeAll();

        return message.channel.send(
            new MessageAttachment(buffer, "batman-slap.png")
        );
    }
}
