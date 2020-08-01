// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Info",
    description: "Get a link to invite the bot",
    usage: "invite",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                    .setTitle("Invite the bot")
                    .setDescription(
                        "Click [here](https://discord.com/api/oauth2/authorize?client_id=718621799499300936&permissions=8&scope=bot 'Click here to invite me!') to invite the bot!",
                    )
                    .setColor("#2f3136"),
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
