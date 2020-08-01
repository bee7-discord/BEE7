// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const money = require("../../models/money");

module.exports = {
    name: "rich",
    category: "Economy",
    description: "Get a list of the richest users in the server!",
    usage: "rich",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            let data = await money.find({});
            data = data.sort((a, b) => b.money - a.money);
            const array = [];
            data.forEach((d) => {
                if (message.guild.members.cache.get(d.userID) === undefined)
                    return;
                array.push(d);
            });

            const embed = new MessageEmbed()
                .setTitle(`Richest Users in ${message.guild.name}`)
                .setDescription(
                    array.map(
                        (x) =>
                            `**${x.money}** - ${
                                message.guild.members.cache.get(x.userID).user
                                    .username
                            }`,
                    ),
                )
                .setColor(`#2f3136`);
            message.channel.send(embed);
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
