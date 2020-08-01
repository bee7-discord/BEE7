/* eslint-disable brace-style */
const { MessageEmbed } = require("discord.js");
const db = require("../../db");

module.exports = {
    name: "help",
    description: "Get a list of all commands",
    usage: "help [command]",
    category: "Info",
    timeout: 3000,
    // eslint-disable-next-line no-unused-vars
    run: async (bot, message, args) => {
        try {
            const prefix = (await db.get(`Prefix_${message.guild.id}`))
                ? await db.get(`Prefix_${message.guild.id}`)
                : "!";

            // If the person is trying to find out more info about a command, and the command exists then display info about that command
            if (args[0] && bot.commands.has(args[0])) {
                const cmd = bot.commands.get(args[0]);
                const embed = new MessageEmbed()
                    .setAuthor(
                        `${cmd.name} | Help`,
                        bot.user.displayAvatarURL(),
                    )
                    .setColor("#2f3136")
                    .setDescription(
                        `**Name: ** ${cmd.name}\n**Description: ** ${
                            cmd.description
                        }\n**Usage: ** ${prefix}${cmd.usage}\n**Aliases: ** ${
                            cmd.aliases ? cmd.aliases.join(", ") : "None"
                        }`,
                    )
                    .setFooter("<> = required, [] = optional");
                return message.channel.send(embed);
            }
            // Spread all the categories into a new array
            const categories = [
                ...new Set(bot.commands.map((cmd) => cmd.category)),
            ];

            // Make a new embed
            const embed = new MessageEmbed();
            embed.setTitle(`**Commands**`);
            embed.setFooter(
                `Bot made by Beatzoid#6969 - Logo made by Hailyy#0666`,
                bot.user.displayAvatarURL(),
            );

            // For every category, add it to the embed as a new field, and map all the command under that cateogry
            for (const id of categories) {
                if (id === "Owner") continue;
                const category = bot.commands.filter(
                    (cmd) => cmd.category === id,
                );
                embed.addField(
                    `- **${id} (${category.size})**`,
                    category.map((cmd) => `\`${cmd.name}\``).join(" "),
                );
                embed.setColor("#2f3136");
            }

            return message.channel.send(embed);
        } catch (err) {
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
