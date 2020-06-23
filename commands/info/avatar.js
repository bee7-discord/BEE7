// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    category: 'Info',
    description: 'Get a users avatar',
    usage: 'avatar [user id or mention]',
    timeout: 3000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const embed = new MessageEmbed();
            // Get either the mention, the id, or the message author and send their avatar in a embed
            const member = message.mentions.members.last() || message.guild.members.cache.get(message.author) || message.member;
            embed.setTitle(`${member.username}'s Avatar`);
            embed.setImage(member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
            embed.setColor('RANDOM');
            return message.channel.send(embed);
            // eslint-disable-next-line brace-style
        } catch(err) {
        const db = require('../../db');
        const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
        console.log(`There was an error!\nError: ${err.stack}`);
        message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
    }
},
};