const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "nick",
            description: "Change someone's nickname",
            usage: "nick <user mention or id> <new nickname>",
            category: "Moderation",
            permission: "MANAGE_MEMBERS"
        });
    }

    /**
     *
     * @param {Message} message - The message of the command
     * @param {String[]} args - The arguments of the command
     */

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        try {
            // Get the user
            const user =
                message.guild.members.cache.get(args[0]) ||
                message.mentions.members.first();
            // If no user return a message

            if (!user) {
                return message.channel.send("Bruh specify a person");
            }
            // Set the nickname

            await user
                .setNickname(args.slice(1).join(" "))
                .catch((err) => this.client.utils.handleError(err, message));

            // Return a message saying nickname was changed
            return message.channel.send(
                `**${user.user.username}'s** nick changed to **${args
                    .slice(1)
                    .join(" ")}**`
            );
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
