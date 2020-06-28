/* eslint-disable brace-style */
const { MessageAttachment } = require('discord.js');
const Canvacord = require("canvacord");
const { mem } = require('systeminformation');
const canva = new Canvacord();

module.exports = {
    name: 'rank',
    category: 'Levels',
    description: "Get your rank or someone else's",
    usage: 'rank [user id or mention]',
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Get the member
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            // Fetch data for that member
            const data = await bot.db.get(`level-${message.guild.id}-${member.id}`);
            // If the person doesn't have a rank, return a message saying that
            if(!data || data.xp === null || data.totalXp === null) return message.reply(`this user doesn't have a rank yet!`);

            let FullData = await bot.db.getAll(`level-${message.guild.id}`);
            FullData = await FullData.sort((a, b) => b.value.totalXp - a.value.totalXp);

            // Generate a rank card and send it to the message channel
            const image = await canva.rank({
                username: member.user.username,
                discrim: member.user.discriminator,
                level: data.level,
                rank: FullData.findIndex(x => x.key === `level-${message.guild.id}-${member.id}`) + 1,
                neededXP: data.level * 40,
                currentXP: data.xp || '0',
                avatarURL: member.user.displayAvatarURL({ format: "png" }),
                color: "#00FFFF",
                background: 'https://wallup.net/wp-content/uploads/2017/03/28/371279-nature-mountains-night.jpg',
                overlay: false,
            });
            const attachment = new MessageAttachment(image, "rank.png");

            message.channel.send(attachment);
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};