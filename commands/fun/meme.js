// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'meme',
    category: 'Fun',
    description: 'Get a random reddit meme!',
    usage: 'meme',
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const embed = new MessageEmbed();
            // Fetch a random meme from reddit
            bot.ksoft.images.meme().then(response => {
                embed.setTitle(response.post.title);
                embed.setURL(response.post.link);
                embed.setImage(response.url);
                embed.setFooter(`👍 ${response.post.upvotes} 💬 ${response.post.comments} | Powered by api.ksoft.si | Requested by ${message.author.username}`);
                embed.setColor('#2f3136');
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