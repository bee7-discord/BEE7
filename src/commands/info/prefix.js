const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const prefixSchema = require("../../models/prefix");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "prefix",
            description: "Get the current prefix or change it",
            usage: "prefix [new prefix]",
            category: "Info"
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
                let prefix;
                const data = await prefixSchema.findOne({
                    guildId: message.guild.id
                });
                if (!data) {
                    prefix = "!";
                } else {
                    prefix = data.prefix;
                }
                return message.channel.send(
                    `The current prefix is \`${prefix}\``
                );
            }

            await prefixSchema.findOne(
                { guildId: message.guild.id },
                async (err, res) => {
                    if (!res) {
                        const newData = await prefixSchema.create({
                            guildId: message.guild.id,
                            prefix: args[0]
                        });
                        return newData.save();
                    }
                    res.prefix = args[0];
                    res.save();
                }
            );

            this.client.prefixes[message.guild.id] = args[0];

            message.channel.send(`The prefix was set to \`${args[0]}\``);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
