/* eslint-disable no-case-declarations */
const { MessageEmbed } = require('discord.js');
const db = require('../../db');

module.exports = {
    name: 'settings',
    category: 'Config',
    description: 'Set settings for the current guild',
    usage: 'settings [setting] [value]',
    timeout: 3000,
    aliases: ["config"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';

        try {
            if (!args[0]) {
                const Embed1 = new MessageEmbed()
                    .setTitle(`Config settings for ${message.guild.name}`)
                    .setDescription(`Do \`${prefix}settings [setting]\` to see more options for that setting`)
                    .setColor(`RANDOM`)
                    .addField(`Config Settings:`, [
                        `**Leveling**`,
                        `**Welcoming**`,
                        `**Automod**`,
                    ], true);

                return message.channel.send(Embed1);
            }

            switch (args[0].toLowerCase()) {
                case 'leveling':
                    const Embed = new MessageEmbed()
                        .setTitle(`Leveling settings for ${message.guild.name}`)
                        .setDescription(`levelChannel\nlevelMessage\nxpRate`)
                        .setTimestamp()
                        .setColor(`RANDOM`);

                    message.channel.send(Embed);
                    break;
                case 'welcoming':
                    const Embed1 = new MessageEmbed()
                        .setTitle(`Welcome settings for ${message.guild.name}`)
                        .setDescription(`welcomeChannel\nwelcomeMessage\n`)
                        .setTimestamp()
                        .setColor(`RANDOM`);

                    message.channel.send(Embed1);
                    break;
                case 'automod':
                    const Embed2 = new MessageEmbed()
                        .setTitle(`Automod settings for ${message.guild.name}`)
                        .setDescription(`antiInviteLink\n`)
                        .setTimestamp()
                        .setColor(`RANDOM`);

                    message.channel.send(Embed2);
                    break;
            }
        // eslint-disable-next-line brace-style
        } catch (err) {
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};