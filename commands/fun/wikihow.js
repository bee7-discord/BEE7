// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'wikihow',
    category: 'Fun',
    description: 'Get a random/funny wikihow article',
    usage: 'wikihow',
    timeout: 2000,
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            bot.ksoft.images.wikihow().then(res => {
                const embed = new MessageEmbed()
                .setDescription(`**[${res.article.title}](${res.article.link})**`)
                .setImage(res.url)
                .setFooter(`Powered by api.ksoft.si | Requested by ${message.author.username}`)
                .setColor(`#2f3136`);
                message.channel.send(embed);
            });
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};