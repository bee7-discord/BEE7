// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deny",
    category: "Suggestions",
    description: "Deny a suggestions",
    usage: "deny <message id of suggestion> <reason>",
    timeout: 5000,
    aliases: ["reject"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            if (!args[0] || !args[1])
                return message.channel.send(
                    "The correct usage for this command is `deny <message id of suggestion> <reason>",
                );

            const channel = message.guild.channels.cache.find(
                (ch) =>
                    ch.name.toLowerCase() === "suggestions" &&
                    ch.type === "text",
            );
            if (!channel)
                return message.channel.send(
                    "Bruh there isn't a channel called `suggestions` or `Suggestions`",
                );
            const suggestionMessage = await channel.messages.fetch(args[0]);

            if (suggestionMessage === undefined)
                return message.channel.send(
                    `Couldn't find a suggestion with that id!`,
                );

            const newEmbed = new MessageEmbed()
                .setTitle(suggestionMessage.embeds[0].title)
                .setDescription(
                    `${suggestionMessage.embeds[0].description}\n\nDenied by ${
                        message.author.username
                    }. Reason:\n${args.slice(1).join(" ")}`,
                )
                .setColor("#2f3136")
                .setFooter(suggestionMessage.embeds[0].footer.text);

            suggestionMessage.edit(newEmbed);
            suggestionMessage.reactions.removeAll();
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
