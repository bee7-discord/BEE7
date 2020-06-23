const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    category: 'Utility',
    description: 'Suggest something!',
    usage: 'suggest <suggestion>',
    timeout: 60000,
    run: async (bot, message, args) => {
        try {
            // Find a channel called suggestions that is a text channel
            // TODO: Make the channel settable via the config command
            const channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'suggestions' && ch.type === 'text');

            // If there is no suggestions channel, then return a message conveying this info
            if (!channel) return message.channel.send(`Please make a channel called \`suggestions\` or \`Suggestions\``);

            // If there is nothing to suggest, return a message
            if (!args[0]) return message.channel.send(`Please give something to suggest!`);

            // Make a new webhook with the message author's profile picture
            const webhook = await channel.createWebhook(message.author.username, {
                avatar: message.author.displayAvatarURL({ dynamic: true }),
            });

            // Generate a embed, send it via the webhook, react to it, then delete the webhook
            const Embed = new MessageEmbed()
            .setTitle(`New Suggestion`)
            .setDescription(`${args.join(' ')}`)
            .setColor(`RANDOM`)
            .setFooter(`Submitted by ${message.author.username} (ID: ${message.author.id})`);

            await webhook.send(Embed).then(async (msg) => {
                await msg.react('👍');
                await msg.react('👎');
            });

            webhook.delete();
        // eslint-disable-next-line brace-style
        } catch (err) {
            message.channel.send(`**ERROR:**\n${err}`);
        }
    },
};