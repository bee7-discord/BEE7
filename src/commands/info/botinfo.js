const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, version: djsversion, Message } = require("discord.js");
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");
const { PaginateContent } = require("discord-paginate");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "botinfo",
            description: "Get information about the bot",
            usage: "botinfo",
            category: "Info",
            aliases: ["bi"]
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
            // Get the core
            const core = os.cpus()[0];
            // Display and send a cool embed
            const pageOneEmbed = new MessageEmbed()
                .setThumbnail(this.client.user.displayAvatarURL())
                .setColor(message.guild.me.displayHexColor || "#2f3136")
                .addField("General", [
                    `**Client:** ${this.client.user.tag} (${this.client.user.id})`,
                    `**Commands:** ${this.client.commands.size}`,
                    `**Servers:** ${this.client.guilds.cache.size.toLocaleString()}`,
                    `**Users:** ${this.client.guilds.cache
                        .reduce((a, b) => a + b.memberCount, 0)
                        .toLocaleString()}`,
                    `**Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
                    `**Creation Date:** ${utc(
                        this.client.user.createdTimestamp
                    ).format("Do MMMM YYY HH:mm:ss")}`,
                    `**Node.js:** ${process.version}`,
                    `**Discord.js:** v${djsversion}`,
                    "\u200b"
                ])
                .addField("System", [
                    `**Platform:** ${process.platform}`,
                    `**Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                    "**CPU:**",
                    `\u3000 Cores: ${os.cpus().length}`,
                    `\u3000 Model: ${core.model}`,
                    `\u3000 Speed: ${core.speed}MHz`,
                    "**Memory:**",
                    `\u3000 Total: ${this.client.utils.formatBytes(
                        process.memoryUsage().heapTotal
                    )}`,
                    `\u3000 Used: ${this.client.utils.formatBytes(
                        process.memoryUsage().heapUsed
                    )}`
                ])
                .setColor("#2f3136")
                .setTimestamp();

            const pageTwoEmbed = new MessageEmbed()
                .setTitle("My developers!")
                .addField(
                    `${this.client.users.cache.get("444655632424108032").tag}`,
                    "Beatzoid is the founder of this bot, and has worked on it for months now.",
                    true
                )
                .addField(
                    `${this.client.users.cache.get("482957218980036618").tag}`,
                    "Avvoid has helped so much with this bot, and even came up with the name!",
                    true
                )
                .addField(
                    `${this.client.users.cache.get("396025342411669515").tag}`,
                    "KateroCodes has been so motivating, and kindly provided the vps that runs this bot!",
                    true
                )
                .addField(
                    `${this.client.users.cache.get("395732703984746496").tag}`,
                    "Hailyy kindly made the logo of this bot!",
                    true
                )
                .addField(
                    `${
                        this.client.users.cache.get("450212014912962560") !==
                        undefined
                            ? this.client.users.cache.get("450212014912962560")
                                  .tag
                            : "Salvage_Dev#3650"
                    }`,
                    "Salvage is where I got the first parts of my bot from, and I used his command handler in version 1 of BEE7.",
                    true
                )
                .addField(
                    "Stuy + Menudocs",
                    "Stuy and Menudocs are two of the most helpful coding servers ever. They make sure you understand why your code isn't working, and help you to fix it.",
                    true
                )
                .setColor("#2f3136");
            const pages = [pageOneEmbed, pageTwoEmbed];
            const paginated = new PaginateContent.DiscordJS(
                this.client,
                message,
                pages
            );

            await paginated.init();
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
