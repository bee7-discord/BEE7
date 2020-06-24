/* eslint-disable brace-style */
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Info',
    description: 'Get the latency of the bot!',
    usage: 'ping',
    timeout: 1000,
    // eslint-disable-next-line no-unused-vars
    run: async (bot, message, args) => {
        try {
            // If you don't know how this works then idk honestly
            const msg = await message.channel.send('🏓 Pinging...');
            const Embed = new MessageEmbed()
                .setTitle(`🏓 Pong! 🏓`)
                .setDescription(`💓 Heartbeat is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI latency is ${Math.round(bot.ws.ping)}ms`)
                .setColor(`RANDOM`)
                .setTimestamp();
            msg.delete();
            msg.channel.send(Embed);
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};