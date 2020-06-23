// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const got = require('got');

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
            got('https://www.reddit.com/r/memes/random/.json').then(response => {
                // Set up some variables
                const content = JSON.parse(response.body);
                const permalink = content[0].data.children[0].data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = content[0].data.children[0].data.url;
                const memeTitle = content[0].data.children[0].data.title;
                const memeUpvotes = content[0].data.children[0].data.ups;
                const memeDownvotes = content[0].data.children[0].data.downs;
                const memeNumComments = content[0].data.children[0].data.num_comments;
                // Set up the embed so it looks cool
                embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
                embed.setImage(memeImage);
                embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
                // Send the embed
                message.channel.send(embed)
                    // eslint-disable-next-line no-unused-vars
                    .then(sent => console.log(`Sent a epic meme to ${message.author.username}`));
                console.log('Bot responded with: ' + memeImage);
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