// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const { pages } = require('../../functions');

module.exports = {
    name: 'leaderboard',
    category: 'Levels',
    description: 'Get a leaderboard of the users with the highest level!',
    usage: 'leaderboard',
    timeout: 3000,
    aliases: ["lb"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            let data = await bot.db.getAll(`level-${message.guild.id}`);
            data = data.sort((a, b) => b.value.totalXp - a.value.totalXp);
            // eslint-disable-next-line no-shadow
            data = await Promise.all(data.map(async (data, index) => {
                const user = await bot.users.fetch(data.key.split("-")[2]).catch(() => null);
                if (user) {
                    return {
                        tag: user.tag,
                        level: data.value.level,
                        rank: index + 1,
                    };
                }
            }));

            if(!data.length) return message.channel.send(`There is no leaderboard for this guild yet! Start chatting already.`);

            const page = pages(data, 10, args[0] || 1);
            if(!page) return message.channel.send(`This page doesn't exist!`);

            message.channel.send(new MessageEmbed()
                .setAuthor(`Leaderboard | ${message.guild.name}`, message.guild.iconURL())
                .setColor(`#f44336`)
                .setDescription(page.map(e => `\`#${e.rank}\` | **${e.tag}** (Level ${e.level})`)),
            );

            // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};