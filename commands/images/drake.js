// eslint-disable-next-line
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "drake",
    category: "Images",
    description: "Generate a drake meme",
    usage: "<text1> <text2>",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            if (!args[0] || !args[1]) {
                return message.channel.send(
                    "Correct usage is `drake <top text> | <bottom text>`",
                );
            }

            const msg = await message.channel.send(
                "<a:loading:721436743550763055>",
            );
            // Split the text using |
            const text = args.join(" ").toString().split("|");
            // Wait for the api to generate the image
            const image = await bot.alexclient.image.drake({
                top: `${text[0]}`,
                bottom: `${text[1]}`,
            });
            // Make a new message attachment with the image
            const messageImage = new MessageAttachment(image, "drake.png");
            // Send the image
            message.channel.send(messageImage);
            msg.delete();
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
