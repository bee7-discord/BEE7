// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "lyrics",
    category: "Music",
    description: "Search lyrics for the currently playing song or another song",
    usage: "lyrics [song name]",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player && !args[0])
                return message.channel.send(
                    `There is nothing playing so you must provide a song name!`,
                );
            if (player) {
                const msg = message.channel.send(
                    "<a:loading:731319127364599810> Fetching lyrics please wait...",
                );

                const lyrics = await bot.ksoft.lyrics.get(
                    player.queue[0].track.title,
                );
                if (lyrics.lyrics.length >= 2048)
                    return (
                        message.channel.send(
                            `Lyrics too long! See them at: ${lyrics.url}`,
                        ) && msg.delete()
                    );
                await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`Lyrics for ${lyrics.name}`)
                        .setDescription(lyrics.lyrics)
                        .setColor("#2f3136")
                        .setImage(lyrics.artwork)
                        .setFooter(`Powered by api.ksoft.si`),
                );
            } else {
                const msg = message.channel.send(
                    "<a:loading:731319127364599810> Fetching lyrics please wait...",
                );

                const lyrics = await bot.ksoft.lyrics.get(args.join(" "));
                if (lyrics.lyrics.length >= 2048)
                    return (
                        message.channel.send(
                            `Lyrics too long! See them at: ${lyrics.url}`,
                        ) && msg.delete()
                    );
                await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`Lyrics for ${lyrics.name}`)
                        .setDescription(lyrics.lyrics)
                        .setColor("#2f3136")
                        .setImage(lyrics.artwork)
                        .setFooter(`Powered by api.ksoft.si`),
                );
            }
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
