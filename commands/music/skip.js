// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    description: "Skips the current song",
    usage: "skip",
    timeout: 5000,
    aliases: ["s"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const { channel } = message.member.voice;
            if (!channel)
                return message.channel.send(
                    "You need to be in a voice channel with me to use this command!",
                );
            if (message.guild.me.voice.channel === null)
                return message.channel.send("I am not in a voice channel!");
            if (
                message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
            )
                return message.channel.send(
                    "You must be in the same voice channel as me!",
                );

            const player = bot.music.players.get(message.guild.id);

            if (!player)
                return message.channel.send(
                    "No song/s currently playing in this guild.",
                );
            player.stop();
            return message.channel.send("✅ | Skipped the current song!");
            // eslint-disable-next-line brace-style
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
