// eslint-disable-next-line
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "achievement",
    category: "Images",
    description: "Generate a Minecraft achievement",
    usage: "achievement <text>",
    timeout: 5000,
    aliases: [""],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Fetch data from a api, and send the image
            if (!args[0]) return message.channel.send("Provide some text");
            const image = await bot.alexclient.image.achievement({
                text: args.join(" "),
            });

            message.channel.send(
                new MessageAttachment(image, "achievement.png"),
            );
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
