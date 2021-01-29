import { User } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Warns from "../../models/Warn";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("warn", {
            aliases: ["warn", "w"],
            category: "Moderation",
            description: {
                content: "Warn a member",
                usage: "warn <member mention or id> <reason>",
                examples: [
                    "warn <@444655632424108032> Spamming",
                    "warn 444655632424108032 Spamming"
                ]
            },
            args: [
                {
                    id: "member",
                    type: "user",
                    default: null
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest"
                }
            ],
            ratelimit: 3
        });
    }

    public async exec(
        message: Message,
        { member, reason }: { member: User; reason: string }
    ): Promise<Message> {
        if (!member || !reason)
            return message.channel.send(
                "Incorrect usage or unknown user! | `warn <member mention or id> <reason>`"
            );

        let existingWarns: any = await Warns.findOne({
            guildId: message.guild.id
        }).exec();

        if (!existingWarns)
            existingWarns = await Warns.create({ guildId: message.guild.id });

        existingWarns.warns.push({
            id: message.author.id,
            reason,
            moderator: message.author.tag
        });
        existingWarns.markModified("warns");
        await existingWarns.save();

        message.channel.send(
            `${member.username} has been warned for ${reason}`
        );
    }
}
