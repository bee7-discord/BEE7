const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const prefixSchema = require("../../models/prefix");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["cmds"],
            description: "Displays all the commands in the bot",
            category: "Info",
            usage: "help"
        });
    }

    async run(message, [command]) {
        let prefix;
        const data = await prefixSchema.findOne({
            guildId: message.guild.id
        });
        if (!data) {
            prefix = "!";
        } else {
            prefix = data.prefix;
        }

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(
                `${message.guild.name} Help Menu`,
                message.guild.iconURL({ dynamic: true })
            )
            .setFooter(
                `Requested by ${message.author.username}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp();

        if (command) {
            const cmd =
                this.client.commands.get(command) ||
                this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return;

            embed.setDescription([
                `**Description:** ${cmd.description}`,
                `**Category:** ${cmd.category}`,
                `**Usage:** ${cmd.usage}`,
                `**Aliases:** ${
                    cmd.aliases.length
                        ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ")
                        : "None"
                }`
            ]);

            return message.channel.send(embed);
        } else {
            embed.setDescription([
                `These are the available commands for ${message.guild.name}`,
                `The bot's prefix is: ${prefix}`,
                `Command Parameters: \`<>\` is strict & \`[]\` is optional`
            ]);

            let categories;

            categories = this.client.utils.removeDuplicates(
                this.client.commands
                    .filter((cmd) => cmd.category !== "Owner")
                    .map((cmd) => cmd.category)
            );

            for (const category of categories) {
                embed.addField(
                    `**${this.client.utils.capitalise(category)}**`,
                    this.client.commands
                        .filter((cmd) => cmd.category === category)
                        .map((cmd) => `\`${cmd.name}\``)
                        .join(" ")
                );
            }
            return message.channel.send(embed);
        }
    }
};
