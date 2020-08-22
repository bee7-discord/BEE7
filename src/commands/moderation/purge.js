/* eslint-disable no-inner-declarations */
const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "purge",
            description: "Purge some messages",
            usage: "purge <number>",
            category: "Moderation",
            permission: "MANAGE_MESSAGES"
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
            if (!args[0]) {
                return message.channel.send(
                    "Please give an amount of messages to delete."
                );
            }

            BigPurge(args[0]);

            let purgedembed = message.channel.send(
                new MessageEmbed()
                    .setTitle("**Purged**")
                    .setDescription(`Deleted ${args[0]} messages.`)
                    .setColor(this.client.colors.success)
            );

            async function BigPurge(messageCount) {
                const messagesToPurge = messageCount > 99 ? 99 : messageCount;

                message.channel.bulkDelete(messagesToPurge);

                //console.log(`Clearing ${messagesToPurge}`)

                if (messageCount > 99) {
                    await sleep(2500);
                    return BigPurge(messageCount - 99);
                } else {
                    message.channel
                        .send(purgedembed)
                        .then((msg) => msg.delete({ timeout: 5000 }));
                }
            }

            function sleep(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
