const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            description: "Get the latency of the bot!",
            usage: "ping",
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
            // If you don't know how this works then idk honestly
            const msg = await message.channel.send("🏓 Pinging...");
            const Embed = new MessageEmbed()
                .setTitle("🏓 Pong! 🏓")
                .setDescription(
                    `Heartbeat is ${Math.floor(
                        msg.createdTimestamp -
                            message.createdTimestamp -
                            this.client.ws.ping
                    )}\nAPI latency is ${Math.floor(this.client.ws.ping)}`
                )
                .setColor("#2f3136")

                .setTimestamp();
            msg.delete();
            msg.channel.send(Embed);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
