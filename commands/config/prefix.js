const db = require('../../db');

module.exports = {
    name: 'prefix',
    category: 'Config',
    description: 'Set the prefix for the current guild',
    usage: 'prefix <New Prefix>',
    timeout: 5000,
    permission: 'MANAGE_GUILD',
    run: async (bot, message, args) => {
        console.log(`Trying to set new prefix for ${message.guild.name} (${message.guild.id})`);
        try {
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!'
            if (!args[0]) return message.channel.send(`The prefix for ${message.guild.name} is \`${prefix}\``);
            await db.set(`Prefix_${message.guild.id}`, args[0]);
            message.channel.send(`Set the prefix to \`${args[0]}\``);
        }
        catch (err) {
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!'
            console.log(`There was an error setting the prefix!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};