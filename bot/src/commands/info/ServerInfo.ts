import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("serverinfo", {
            aliases: ["serverinfo", "si"],
            category: "Info",
            description: {
                content: "Get info about the current server",
                usage: "serverinfo",
                examples: ["serverinfo"],
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message): Promise<Message> {
        return message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    message.guild.name,
                    message.guild.iconURL({ dynamic: true })
                )
                .setColor(this.client.config.transparentColor)
                .addField("Owner", message.guild.owner.user.tag, true)
                .addField("Emoji Count", message.guild.emojis.cache.size, true)
                .addField("Region", message.guild.region, true)
                .addField(
                    "Text Channels",
                    message.guild.channels.cache.filter(
                        (c) => c.type === "text"
                    ).size,
                    true
                )
                .addField(
                    "Voice Channels",
                    message.guild.channels.cache.filter(
                        (c) => c.type === "voice"
                    ).size,
                    true
                )
                .addField(
                    "Explicit Content Filter",
                    this.client.utils.titleCase(
                        message.guild.explicitContentFilter.replace("_", " ")
                    ),
                    true
                )
                .addField(
                    "Verification Level",
                    this.client.utils.titleCase(
                        message.guild.verificationLevel.replace("_", " ")
                    ),
                    true
                )
                .setFooter(`Id: ${message.guild.id} | Created at`)
                .setTimestamp(message.guild.createdAt)
        );
    }
}
