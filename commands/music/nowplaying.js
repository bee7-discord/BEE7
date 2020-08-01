// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const { Utils } = require("erela.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "nowplaying",
    category: "Music",
    description: "Get the currently playing song",
    usage: "nowplaying",
    timeout: 5000,
    aliases: ["np"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player || !player.queue[0])
                return message.channel.send(
                    "No song/s currently playing within this guild.",
                );

            const { title, author, duration } = player.queue[0];

            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setAuthor(
                    "Current Song Playing.",
                    message.author.displayAvatarURL,
                )
                .setThumbnail(player.queue[0].displayThumbnail())
                .setDescription(stripIndents`
                ${
                    player.playing ? "▶️" : "⏸️"
                } **${title}** \`${Utils.formatTime(
                duration,
                true,
            )}\` by ${author}
                `);

            return message.channel.send(embed); // eslint-disable-next-line brace-style
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
