import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Util from "../../classes/Util";

export default class HelpCommand extends CustomCommand {
    public constructor() {
        super("help", {
            aliases: ["help"],
            category: "Info",
            description: {
                content: "Get a list of the bots commands",
                usage: "help [command]",
                examples: ["help botinfo", "help userinfo"],
            },
            ratelimit: 3,
            args: [
                {
                    id: "command",
                    type: "commandAlias",
                    default: null,
                },
            ],
        });
    }

    public async exec(
        message: Message,
        { command }: { command: CustomCommand }
    ): Promise<Message> {
        const embed = new MessageEmbed().setColor(
            this.client.config.transparentColor
        );

        if (command) {
            embed
                .setColor(this.client.config.transparentColor)
                .addField(
                    "❯ Usage",
                    `\`${
                        command.description.usage
                            ? command.description.usage
                            : "No usage"
                    }\``
                )
                .addField(
                    "❯ Description",
                    command.description.content || "No Description provided"
                )
                .setFooter("<> means required, [] means optional");

            if (command.aliases.length > 1) {
                embed.addField(
                    "❯ Aliases",
                    `\`${command.aliases.slice(1).join("`, `")}\``
                );
            }

            if (command.userPermissions) {
                embed.addField(
                    "❯ Required Permissions",
                    (command.userPermissions as any).map(
                        (c: string) =>
                            `\`${Util.titleCase(c.replace("_", " "))}\``
                    )
                );
            }

            if (
                command.description.examples &&
                command.description.examples.length
            ) {
                embed.addField(
                    "❯ Examples",
                    command.description.examples.map((c: string) =>
                        c.includes("<@") ? c : `\`${c}\``
                    )
                );
            }
        } else {
            embed
                .setTitle("Help")
                .setDescription(
                    `For additional info on a command, type \`${await message
                        .guild.prefix}help <command>\``
                )
                .setFooter(
                    `${this.handler.modules.size} Commands`,
                    this.client.user.displayAvatarURL()
                );

            for (const category of this.handler.categories.values()) {
                if (category.id.toLowerCase() === "owner") continue;
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase()
                    )}`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(", ")}`
                );
            }
        }

        return message.util.send(embed);
    }
}
