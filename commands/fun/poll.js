const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Get people to vote on something!",
    timeout: 2000,
    usage: "poll <channel mention> <question>",
    category: "Fun",
    run: async (bot, message, args) => {
        try {
            // if the message author doesn't have permissions, return a message conveying that info
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                return message.channel.send(
                    `You do not have the manage message permission, ${message.author.username}!`,
                );
            }

            // get the channel
            const channel =
                message.mentions.channels.first() ||
                message.guild.channels.cache.get(args[0]);
            // if there is no channel, return a message saying that info
            if (!channel) {
                return message.channel.send(
                    `You did not mention / give the id of your channel!`,
                );
            }
            // Get the question
            const question = args.slice(1).join(" ");

            // If there is no question, return a message conveying that info
            if (!question) {
                return message.channel.send(
                    `You did not specify your question!`,
                );
            }
            // Send a cool embed
            const Embed = new MessageEmbed()
                .setTitle(`New poll!`)
                .setDescription(`${question}`)
                .setFooter(`${message.author.username} created this poll.`)
                .setColor("#2f3136");
            message.delete();
            // Send the embed to the channel
            const msg = await bot.channels.cache.get(channel.id).send(Embed);
            // React to the message
            await msg.react("👍");
            await msg.react("👎");
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
