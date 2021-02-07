import dayjs from "dayjs";
import { MessageEmbed, GuildMember, Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class UserInfoCommand extends CustomCommand {
    public constructor() {
        super("userinfo", {
            aliases: ["userinfo", "ui"],
            category: "Info",
            description: {
                content: "Get a users info",
                usage: "ui [user mention or id]",
                examples: [
                    "userinfo <@444655632424108032>",
                    "userinfo 444655632424108032",
                ],
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member,
                },
            ],
        });
    }

    public exec(
        message: Message,
        { member }: { member: GuildMember }
    ): Promise<Message> {
        const format = "MM/DD/YYYY h:mm A";
        const serverMember: GuildMember = message.guild.members.cache.get(
            member.user.id
        );

        return message.util.send(
            new MessageEmbed()
                .setAuthor(
                    member.user.username,
                    member.user.displayAvatarURL({ dynamic: true })
                )
                .addField(
                    "Joined This Server",
                    dayjs(serverMember.joinedAt).format(format),
                    true
                )
                .addField(
                    "Registered on Discord",
                    dayjs(member.user.createdAt).format(format),
                    true
                )
                .addField(
                    "Roles",
                    serverMember.roles.cache
                        // Filters out the @everyone role
                        .filter((x) => x.id !== message.guild.id)
                        .map((x) => `<@&${x.id}>`)
                        .join(" ")
                )
                .setColor(this.client.config.transparentColor)
        );
    }
}
