import { GuildMember } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import ms from "ms";

export default class BanCommand extends CustomCommand {
    public constructor() {
        super("ban", {
            aliases: ["ban", "b"],
            category: "Moderation",
            description: {
                content: "Ban a member",
                usage: "ban <member id or mention> [time] <reason>",
                examples: [
                    "ban <@444655632424108032> spamming",
                    "ban 444655632424108032 spamming",
                ],
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: `Please specify a member to ban`,
                        retry: `Please specify a valid member (one who is in the guild) to ban`,
                    },
                },
                {
                    id: "time",
                    type: (_, phrase) => {
                        if (phrase && ms(phrase) > 0) return ms(phrase);
                        if (
                            ["perm", "permanent"].includes(phrase.toLowerCase())
                        )
                            return "Permanent";
                        return null;
                    },
                    prompt: {
                        start: `Please specify a time period`,
                        retry: `Please specify a valid time period`,
                    },
                },
                {
                    id: "reason",
                    type: "string",
                    default: "No reason specified",
                },
            ],
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
        });
    }

    public async exec(
        message: Message,
        {
            member,
            time,
            reason,
        }: { member: GuildMember; time: any; reason: string }
    ): Promise<any> {
        if (member.id === message.member.id)
            return message.channel.send("Why would you do that");

        if (
            (member.roles.highest.position >
                message.member.roles.highest.position &&
                message.guild.owner.id !== message.member.id) ||
            member.id === message.guild.owner.id
        )
            return message.channel.send(
                `**${member.user.username}** has a higher staff position than you so you can't ban them`
            );

        member
            .send(
                `You've been banned from \`${message.guild.name}\` for \`${reason}\``
            )
            .catch(() => null);

        member
            .ban({ reason })
            .catch(() => message.channel.send("I cannot ban that member"));

        if (time.toLowerCase() !== "permanent") {
            setTimeout(() => {
                message.guild.members.unban(member.id, "Ban period expired");
            }, time);
        }
    }
}
