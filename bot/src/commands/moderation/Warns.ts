import { User, Message, TextChannel } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Warns from "../../models/Warn";
import { FieldsEmbed } from "discord-paginationembed";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("warns", {
            aliases: ["warns"],
            category: "Moderation",
            description: {
                content: "Show a members warns",
                usage: "warns <member mention or id>",
                examples: [
                    "warns <@444655632424108032>",
                    "warns 444655632424108032",
                ],
            },
            args: [
                {
                    id: "member",
                    type: "user",
                    default: null,
                },
            ],
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    public async exec(
        message: Message,
        { member }: { member: User }
    ): Promise<Message> {
        if (!member)
            return message.channel.send(
                "Incorrect usage or unknown user! | `warns <member mention or id>`"
            );

        if (member.bot)
            return message.channel.send(
                "You can't warn or check the warns of bots!"
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
            return message.channel.send(
                `${member.username} doesn't have any warns!`
            );

        const FieldEmbed = new FieldsEmbed()
            .setArray(userWarns)
            .setAuthorizedUsers(message.author.id)
            .setChannel(message.channel as TextChannel)
            .setElementsPerPage(5)
            .formatField(
                "Warns",
                (warn: any) =>
                    `ID: ${warn.id}\nModerator: ${warn.moderator}\nReason: ${warn.reason}\n`
            )
            .setDisabledNavigationEmojis(["delete"])
            .setPageIndicator(true);

        FieldEmbed.embed
            .setColor(0x00ffff)
            .setAuthor(`${member.username}'s Warns`);

        await FieldEmbed.build();
    }
}
