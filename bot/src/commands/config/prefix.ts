import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import GuildConfig from "../../models/GuildConfig";
import { GuildConfigType } from "../../utils/types";

export default class PrefixCommand extends CustomCommand {
    public constructor() {
        super("prefix", {
            aliases: ["prefix"],
            category: "Config",
            description: {
                content: "An alias for `config prefix`",
                usage: "prefix <new prefix>",
                examples: ["prefix !"],
            },
            args: [
                {
                    id: "prefix",
                    type: "string",
                    default: null,
                },
            ],
        });
    }

    public async exec(
        message: Message,
        { prefix }: { prefix: string }
    ): Promise<Message> {
        const config = (await GuildConfig.findOne({
            guildId: message.guild.id,
        })) as GuildConfigType;

        if (!prefix)
            return message.channel.send(
                `The current guild's prefix is \`${await message.guild
                    .prefix}\``
            );

        config.settings.prefix = prefix;
        config.markModified("settings.prefix");
        await config.save();
        return message.channel.send(
            `Successfully set the current prefix to \`${prefix}\``
        );
    }
}
