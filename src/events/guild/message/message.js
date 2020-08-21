const Event = require("../../../Structures/Event");
const prefixSchema = require("../../../models/prefix");
const { MessageEmbed } = require("discord.js-light");

module.exports = class extends Event {
    async run(message) {
        console.log(message);
        // Mention regex
        const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
        // Mention prefix
        const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

        // If no message guild or the message author is a bot return
        if (!message.guild || message.author.bot) return;

        // If they mentioned the bot, say the prefix of the current guild
        if (message.content.match(mentionRegex))
            message.channel.send(
                `My prefix for ${message.guild.name} is \`${this.client.prefix}\``,
            );

        // #region Prefix
        let mongoPrefix;
        const data = await prefixSchema.find({ guildId: message.guild.id });
        if (!data.length) {
            await prefixSchema.create({
                guildId: message.guild.id,
                prefix: "!",
            });
            mongoPrefix = "!";
        } else {
            mongoPrefix = data[0].prefix;
        }
        // #endregion Prefix

        // Set the prefix either to the bot mention or the actual prefix
        const prefix = message.content.match(mentionRegexPrefix)
            ? message.content.match(mentionRegexPrefix)[0]
            : mongoPrefix;

        if (!message.content.startsWith(prefix)) return;

        // Get the command name and args
        const [cmd, ...args] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        // Get the command by name or the command aliases
        const command =
            this.client.commands.get(cmd.toLowerCase()) ||
            this.client.commands.get(
                this.client.aliases.get(cmd.toLowerCase()),
            );

        if (!command) return;

        // #region Permission Check
        if (
            command.permission &&
            !this.client.owners.includes(message.author.id)
        ) {
            if (!message.member.permissions.has(command.permission)) {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle("🔐 Permission Denied 🔐")
                        .setDescription(
                            `${message.author.tag} you need the ${command.permission} permission to access that command!`,
                        ),
                );
                return;
            }
        }
        // #endregion Permission Check

        // If there is a command, run it
        command.run(message, args);
    }
};
