// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    category: "Music",
    description: "Get the current queue for the server",
    usage: "queue",
    timeout: 5000,
    aliases: ["q"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player || !player.queue[0])
                return message.channel.send(
                    "No song currently playing in this guild.",
                );

            let index = 1;
            let string = "";

            if (player.queue[0])
                string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
            if (player.queue[1])
                string += `__**Rest of queue:**__\n ${player.queue
                    .slice(1, 10)
                    .map(
                        (x) =>
                            `**${index++})** ${x.title} - **Requested by ${
                                x.requester.username
                            }**.`,
                    )
                    .join("\n")}`;

            const embed = new MessageEmbed()
                .setAuthor(
                    `Current Queue for ${message.guild.name}`,
                    message.guild.iconURL(),
                )
                .setColor("#2f3136")
                .setThumbnail(player.queue[0].displayThumbnail())
                .setDescription(string);

            return message.channel.send(embed);
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
