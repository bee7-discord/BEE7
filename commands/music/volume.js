// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    category: "Music",
    description: "Set the volume of the music",
    usage: "volume <volume>",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player)
                return message.channel.send(
                    "No song/s currently playing within this guild.",
                );

            const { channel } = message.member.voice;
            if (!channel || channel.id !== player.voiceChannel.id)
                return message.channel.send(
                    "You need to be in a voice channel with me to adjust the volume.",
                );

            if (!args[0])
                return message.channel.send(`Current Volume: ${player.volume}`);

            if (Number(args[0]) <= 0 || Number(args[0]) > 100)
                return message.channel.send(
                    "You may only set the volume to 1-100",
                );

            player.setVolume(Number(args[0]));
            return message.channel.send(
                `Successfully set the volume to: ${args[0]}`,
            ); // eslint-disable-next-line brace-style
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
