// eslint-disable-next-line
const db = require("../../db");
// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "config",
    category: "Config",
    description: "Configure server settings",
    usage: "config",
    timeout: 5000,
    aliases: ["settings"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        const prefix = (await db.get(`Prefix_${message.guild.id}`))
            ? await db.get(`Prefix_${message.guild.id}`)
            : "!";
        try {
            if (!args[0])
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle(`Config Settings for ${message.guild.name}`)
                        .setDescription(
                            `These are the config settings that you can set for the current guild`,
                        )
                        .addField(
                            `❗ **Prefix**`,
                            `\`${prefix}config prefix\``,
                            true,
                        )
                        .setFooter(`There will be more in the future!`),
                );
            switch (args[0].toLowerCase()) {
                case "prefix":
                    if (!args[1]) {
                        message.channel.send(
                            new MessageEmbed()
                                .setTitle(
                                    `Set the prefix for ${message.guild.name}`,
                                )
                                .addField(`ℹ Current Setting:`, `\`${prefix}\``)
                                .addField(
                                    `<a:update:737458568885960836> Update:`,
                                    `\`${prefix}config prefix <Prefix>\``,
                                )
                                .addField(
                                    `Example`,
                                    `\`${prefix}config prefix ?\``,
                                ),
                        );
                    }
                    break;
            }
            // eslint-disable-next-line brace-style
        } catch (err) {
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(
                `**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`,
            );
        }
    },
};
