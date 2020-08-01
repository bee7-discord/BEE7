/* eslint-disable brace-style */
const { MessageEmbed, version: djsversion } = require("discord.js");
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");
const { formatBytes } = require("../../functions");

module.exports = {
    name: "botinfo",
    category: "Info",
    description: "Get information about the bot",
    usage: "botinfo",
    timeout: 5000,
    aliases: ["bi", "stats"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Get the core
            const core = os.cpus()[0];
            // Display and send a cool embed
            const embed = new MessageEmbed()
                .setThumbnail(bot.user.displayAvatarURL())
                .setColor(message.guild.me.displayHexColor || "#2f3136")
                .addField(`General`, [
                    `**❯ Client:** ${bot.user.tag} (${bot.user.id})`,
                    `**❯ Commands:** ${bot.commands.size}`,
                    `**❯ Servers:** ${bot.guilds.cache.size.toLocaleString()}`,
                    `**❯ Users:** ${bot.guilds.cache
                        .reduce((a, b) => a + b.memberCount, 0)
                        .toLocaleString()}`,
                    `**❯ Channels:** ${bot.channels.cache.size.toLocaleString()}`,
                    `**❯ Creation Date:** ${utc(
                        bot.user.createdTimestamp,
                    ).format("Do MMMM YYY HH:mm:ss")}`,
                    `**❯ Node.js:** ${process.version}`,
                    `**❯ Discord.js:** v${djsversion}`,
                    "\u200b",
                ])
                .addField("System", [
                    `**❯ Platform:** ${process.platform}`,
                    `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                    `**❯ CPU:**`,
                    `\u3000 Cores: ${os.cpus().length}`,
                    `\u3000 Model: ${core.model}`,
                    `\u3000 Speed: ${core.speed}MHz`,
                    `**❯ Memory:**`,
                    `\u3000 Total: ${formatBytes(
                        process.memoryUsage().heapTotal,
                    )}`,
                    `\u3000 Used: ${formatBytes(
                        process.memoryUsage().heapUsed,
                    )}`,
                ])
                .setTimestamp();
            message.channel.send(embed);
        } catch (err) {
            const db = require("../../db");
            const prefix = (await db.get(`Prefix_${message.guild.id}`))
                ? await db.get(`Prefix_${message.guild.id}`)
                : "!";
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(
                `**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`,
            );
        }
    },
};
