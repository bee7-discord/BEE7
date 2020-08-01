// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const { insertMoney } = require("../../functions");
const moneySchema = require("../../models/money");

module.exports = {
    name: "search",
    category: "Economy",
    description: "Search for some money",
    usage: "search",
    timeout: 30000,
    timeoutMsg: `Woah there! You're tired from searching, try again in {time}.`,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const filter = (response) => {
                return response.author.id === message.author.id;
            };

            message.channel.send(
                `Where would you like to search?\n**1.** \`Mom's Purse\`\n**2.** \`Bed\`\n**3.** \`Tree\``,
            );

            const collector = message.channel.createMessageCollector(filter, {
                time: 15000,
            });

            collector.on("collect", (m) => {
                const generatedMoney = Math.floor(Math.random() * 200);

                switch (m.content.toLowerCase()) {
                    case ("mom's purse", "moms purse"):
                        message.channel.send(
                            `**Area searched:** Mom's purse.\nYou found \`${generatedMoney}\` beats in your mom's purse.`,
                        );
                        insertMoney(
                            generatedMoney,
                            moneySchema,
                            message.author,
                        );
                        collector.stop();
                        break;
                    case "bed":
                        message.channel.send(
                            `**Area searched:** Bed.\nYou found \`${generatedMoney}\` beats under your bed.`,
                        );
                        insertMoney(
                            generatedMoney,
                            moneySchema,
                            message.author,
                        );
                        collector.stop();
                        break;
                    case "tree":
                        message.channel.send(
                            `**Area searched:** Tree.\nYou found \`${generatedMoney}\` beats inside the tree.`,
                        );
                        insertMoney(
                            generatedMoney,
                            moneySchema,
                            message.author,
                        );
                        collector.stop();
                        break;
                }
            });

            collector.on("end", (collected) => {
                // Stuff
            });
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
