import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Warns from "../../models/Warn";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("deletewarn", {
            aliases: ["deletewarn", "delwarn"],
            category: "Moderation",
            description: {
                content: "Delete a users warn",
                usage: "delwarn <Warn Id>",
                examples: ["delwarn"],
            },
            args: [
                {
                    id: "id",
                    type: "string",
                },
            ],
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
        });
    }

    public async exec(
        message: Message,
        { id }: { id: string }
    ): Promise<Message> {
        const warns: any = await Warns.findOne({
            guildId: message.guild.id,
        });

        const warn = warns.warns.filter((warn: any) => warn.id === id);
        if (!warn.length)
            return message.channel.send(`Warn \`${id}\` not found!`);

        warns.warns.forEach((warn1: any) =>
            warn1.id === id
                ? warns.warns.splice(warns.warns.indexOf(warn))
                : null
        );
        await warns.save();

        return message.util.send(`Warn \`${id}\` deleted successfully`);
    }
}
