// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const money = require("../../models/money");

module.exports = {
    name: "bal",
    category: "Economy",
    description: "Get your or another users balance",
    usage: "bal [user id or mention]",
    timeout: 5000,
    aliases: ["balance"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            money.findOne({ userID: message.author.id }, (err, data) => {
                if (err) throw new Error(err);

                if (data) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle(`${message.author.username}'s Balance`)
                            .setDescription(`Wallet: ${data.money}\nBank: Soon`)
                            .setColor(`#2f3136`),
                    );
                    data.save();
                } else {
                    const newMoney = new money({
                        userID: message.author.id,
                        money: 0,
                    });
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle(`${message.author.username}'s Balance`)
                            .setDescription(
                                `Wallet: ${newMoney.money}\nBank: Soon`,
                            )
                            .setColor(`#2f3136`),
                    );
                    newMoney.save();
                }
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
