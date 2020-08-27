const Event = require("../../../Structures/Event");
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Message } = require("discord.js");
const humanizeDuration = require("humanize-duration");
const ms = require("ms");
const Timeout = new Map();

module.exports = class extends Event {
    /**
     *
     * @param {Message} message - The Message
     */

    async run(message) {
        // Mention regex
        const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
        // Mention prefix
        const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

        // If no message guild or the message author is a bot return
        if (!message.guild || message.author.bot) return;

        // If they mentioned the bot, say the prefix of the current guild
        if (message.content.match(mentionRegex))
            message.channel.send(
                `My prefix for ${message.guild.name} is \`${this.client.prefix}\``
            );

        // Set the prefix either to the bot mention or the actual prefix
        let prefix;
        message.content.match(mentionRegexPrefix)
            ? (prefix = message.content.match(mentionRegexPrefix)[0])
            : this.client.prefixes[message.guild.id] !== undefined
            ? (prefix = this.client.prefixes[message.guild.id])
            : this.client.prefixes[message.guild.id] === "!" && prefix === "!";

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
                this.client.aliases.get(cmd.toLowerCase())
            );

        if (!command) return;

        // #region Permission Check
        if (
            command.permission &&
            !this.client.owners.includes(message.author.id) &&
            command.permission !== "No permission required"
        ) {
            if (!message.member.permissions.has(command.permission)) {
                message.channel.send(
                    new MessageEmbed()
                        .setAuthor("Error ", message.author.displayAvatarURL())
                        .setTitle("🔐 Permission Denied 🔐")
                        .setDescription(
                            `${message.author.tag} you need the \`${command.permission}\` permission to access that command!`
                        )
                        .setColor(this.client.colors.error)
                );
                return;
            }
        }
        // #endregion Permission Check

        //#region Cooldown

        // Cooldown and run the command
        this.client.logger.log(null, null, message);
        if (command.timeout === 0) return command.run(message, args);

        const key = message.author.id + command.name;
        const found = Timeout.get(key);
        const timeout = command.cooldown;

        // If the person is on cooldown then display that information
        if (found) {
            const timePassed = Date.now() - found;
            const timeLeft = timeout - timePassed;

            if (command.timeoutMsg) {
                const timeoutMessage = command.timeoutMsg.replace(
                    "{time}",
                    humanizeDuration(timeLeft, { round: true })
                );

                const slowdownEmbed = new MessageEmbed()
                    .setTitle("Slow down!")
                    .setDescription(timeoutMessage)
                    .setColor("#C40000")
                    .setFooter("Cooldown system made by JJNotLiveS#1053");
                return message.channel.send(slowdownEmbed);
            }

            const slowdownEmbed = new MessageEmbed()
                .setTitle("Slow down!")
                .setDescription(
                    `You can use this command again in **${humanizeDuration(
                        timeLeft,
                        { round: true }
                    )}**.The default cooldown for this command is \`${ms(
                        timeout
                    )}\`.`
                )
                .setColor("#C40000")
                .setFooter("Cooldown system made byJJNotLiveS#1053");
            return message.channel.send(slowdownEmbed);
            // else run the command and add them to the cooldown
        } else {
            command.run(message, args);
            Timeout.set(key, Date.now());

            setTimeout(() => {
                Timeout.delete(key);
            }, command.cooldown);
        }
        //#endregion Cooldown
    }
};
