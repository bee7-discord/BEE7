// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    category: "Music",
    description: "Stop the current track and make me leave the VC",
    usage: "stop",
    timeout: 5000,
    aliases: ["dc", "disconnect"],
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

            bot.music.players.destroy(message.guild.id);
            message.react("👋");
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
