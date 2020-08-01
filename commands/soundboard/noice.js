// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "noice",
    category: "Soundboard",
    description: "Play the noice sound effect in the current VC",
    usage: "noice",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const { channel } = message.member.voice;
            if (!channel)
                return message.channel.send("Please join a voice channel!");

            channel.join().then((connection) => {
                const dispatcher = connection.play(
                    "./soundboard_sounds/noice.mp3",
                );
                message.channel.send(
                    `<a:playing:733044212819558452> | Now playing the noice sound effect in voice channel \`${connection.channel.name}\``,
                );

                dispatcher.on("speaking", (speaking) => {
                    if (!speaking) channel.leave();
                });
            }); // eslint-disable-next-line brace-style
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
