// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    category: 'Moderation',
    description: 'Get the last deleted message!',
    usage: 'snipe',
    timeout: 5000,
    permission: 'MANAGE_MESSAGES',
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const msg = bot.snipes.get(message.channel.id);
            if (!msg) return message.reply('No recently deleted messages!');

            const embed = new MessageEmbed()
                .setAuthor(`Sent by ${msg.author.tag}`, msg.author.displayAvatarURL())
                .setDescription(msg.content)
                .setColor('#2f3136');

            if (msg.image) embed.setImage(msg.image);

            message.channel.send(embed);

            // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};