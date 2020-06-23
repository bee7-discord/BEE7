/* eslint-disable brace-style */

const db = require('../../db');

module.exports = async (bot, message) => {
    // Get the prefix
    const newPrefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';

    // If the message was sent by a bot, doesn't start with the prefix, or wasn't in a guild, return
    if (message.author.bot || !message.content.startsWith(newPrefix) || !message.guild) return;
    // If there is no message member, fetch the member
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if(message.author.id === '709770158012629042') return message.channel.send('OOF get blacklisted');

    // Auto mod and rank code
    require('./Message Event Code/Automod')(bot, message);
    require('./Message Event Code/Rank')(bot, message);

    // Variables
    const args = message.content.slice(newPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);

    // Makes aliases work, don't remove
    if (!command || !command.run) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) return;
    if (command.ownerOnly && message.author.id !== "444655632424108032") return;

    // Permission Checks
    if (command.permission && message.author.id !== '444655632424108032') {
        if (!message.member.permissions.has(command.permission)) {
            console.log(`User doesn't have required permissions, sending message...`);
            return message.channel.send(`You need the permission \`${command.permission}\` to run this command!`);
        }
    }

    // Cooldown
    require(`./Message Event Code/Cooldown`)(bot, message, args, command);
};