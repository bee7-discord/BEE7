/* eslint-disable brace-style */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer',
};

module.exports = {
    name: 'userinfo',
    category: 'Info',
    description: 'Get information about a user',
    usage: 'userinfo [user id/mention]',
    timeout: 5000,
    aliases: ["ui"],
    // eslint-disable-next-line no-unused-vars
    run: async (bot, message, args) => {
        try {
            // Fetch the member, roles sorted and not everyone, user flags, and instantiate the embed
            const member = message.mentions.members.last() || message.guild.members.cache.get(message.author) || message.member;
            const roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
            const userFlags = member.user.flags.toArray();
            const embed = new MessageEmbed()
            // Generate and send a really nice embed
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(member.displayHexColor || 'BLUE')
                .addField(`User`, [
                    `**❯ Username:** ${member.user.username}`,
                    `**❯ Discriminator:** ${member.user.discriminator}`,
                    `**❯ ID:** ${member.id}`,
                    `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                    `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                    `**❯ Time Created:** ${moment(member.user.createdTimestamp).format(`LT`)} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                    `**❯ Status:** ${member.user.presence.status.toUpperCase()}`,
                    `**❯ Game:** ${member.user.presence.game || 'Not playing a game'}`,
                    `\u200b`,
                ])
                .addField(`Member`, [
                    `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                    `**❯ Server Join Date:** ${moment(member.joinedAt).format(`LL LTS`)}`,
                    `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                    `**❯ Roles [${roles.length}]:** ${roles.join(', ')}`,
                    `\u200b`,
                ]);
            message.channel.send(embed);
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};