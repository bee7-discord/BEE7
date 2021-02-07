import { User } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Warns from "../../models/Warn";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("clearwarns", {
            aliases: ["clearwarns", "cw"],
            category: "Moderation",
            description: {
                content: "Clear ***all*** of a users warns",
                usage: "clearwarns <user id or mention>",
                examples: [
                    "clearwarns <@444655632424108032>",
                    "clearwarns 444655632424108032",
                ],
            },
            args: [
                {
                    id: "member",
                    type: "user",
                    default: null,
                },
            ],
            userPermissions: ["ADMINISTRATOR"],
            ratelimit: 3,
        });
    }

    public async exec(
        message: Message,
        { member }: { member: User }
    ): Promise<Message> {
        if (!member)
            return message.channel.send(
                "Incorrect usage or unknown user! | `clearwarns <member mention or id>`"
            );

        let existingWarns: any = await Warns.findOne({
            guildId: message.guild.id,
        }).exec();

        if (!existingWarns)
            existingWarns = await Warns.create({ guildId: message.guild.id });

        const userWarns = existingWarns.warns.filter(
            (warn: any) => warn.user === member.id
        );

        if (!userWarns.length)
            return message.channel.send("This user doesn't have any warns!");

        existingWarns.warns.length = 0;
        existingWarns.markModified("warns");
        await existingWarns.save();

        message.channel.send(
            `Successfully cleared all warns from ${member.tag}`
        );
    }
}
