const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    category: "Suggestions",
    description: "Suggest something!",
    usage: "suggest <suggestion>",
    timeout: 60000,
    run: async (bot, message, args) => {
        try {
            // Find a channel called suggestions that is a text channel
            // TODO: Make the channel settable via the config command
            const channel = message.guild.channels.cache.find(
                (ch) =>
                    ch.name.toLowerCase() === "suggestions" &&
                    ch.type === "text",
            );

            // If there is no suggestions channel, then return a message conveying this info
            if (!channel)
                return message.channel.send(
                    `Please make a channel called \`suggestions\` or \`Suggestions\``,
                );

            // If there is nothing to suggest, return a message
            if (!args[0])
                return message.channel.send(
                    `Please give something to suggest!`,
                );
            // Generate a embed, send it via the webhook, react to it, then delete the webhook
            const Embed = new MessageEmbed()
                .setTitle(`New Suggestion`)
                .setDescription(`${args.join(" ")}`)
                .setColor("#2f3136")
                .setFooter(
                    `Submitted by ${message.author.username} (ID: ${message.author.id})`,
                );

            await channel.send(Embed).then(async (msg) => {
                message.channel.send(
                    `Successfully sent your suggestion to <#${channel.id}> to be voted on!`,
                );
                await msg.react("👍");
                await msg.react("🤷‍♂️");
                await msg.react("👎");
            });
            // eslint-disable-next-line brace-style
        } catch (err) {
            message.channel.send(`**ERROR:**\n${err}`);
        }
    },
};
