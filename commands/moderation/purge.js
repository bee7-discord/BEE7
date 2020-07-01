// eslint-disable-next-line
module.exports = {
    name: 'purge',
    category: 'Moderation',
    description: 'Purge some messages',
    usage: 'purge <number>',
    timeout: 5000,
    aliases: ["clear"],
    permission: "MANAGE_MESSAGES",
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            if(!args[0]) return message.channel.send("Please provide a number of messages to delete.");
            if(Number(args[0]) + 1 > 100) return message.channel.send('Please provide a number less than 100!');
            message.channel.bulkDelete(Number(args[0]) + 1);
            message.channel.send(`Successfully purged ${args[0]} messages!`).then(msg => msg.delete({ timeout: 5000 }));
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};