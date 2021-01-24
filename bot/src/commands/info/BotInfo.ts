import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class BotInfoCommand extends CustomCommand {
    public constructor() {
        super("botinfo", {
            aliases: ["botinfo", "bi"],
            category: "Info",
            description: {
                content: "Get information about the bot",
                usage: "botinfo",
                examples: ["botinfo"]
            },
            ratelimit: 4
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(
            new MessageEmbed()
                .setAuthor(
                    this.client.user.username,
                    this.client.user.displayAvatarURL({ dynamic: true })
                )
                .addField("Library", "discord-akairo", true)
                .addField(
                    "Creator",
                    this.client.users.cache.get("444655632424108032").tag,
                    true
                )
                .addField("Servers", this.client.guilds.cache.size, true)
                .addField(
                    "Users",
                    this.client.users.cache.filter((u) => !u.bot).size,
                    true
                )
                .addField(
                    "Invite",
                    '[Invite](https://discord.com/api/oauth2/authorize?client_id=802019866525696050&permissions=8&scope=bot "Click it")',
                    true
                )
                .addField(
                    "Voice Connections",
                    this.client.player.queues.size,
                    true
                )
                .setFooter(
                    `The user count excludes bots | Uptime: ${this.client.utils.convertTime(
                        this.client.uptime
                    )}`
                )
                .setColor(this.client.config.transparentColor)
        );
    }
}
