// eslint-disable-next-line
const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'changemymind',
    category: 'Fun',
    description: 'Generate a change my mind meme',
    usage: 'changemymind <text>',
    timeout: 5000,
    aliases: ["cmm"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const msg = await message.channel.send('<a:loading:721436743550763055>');
            // If there are no args, send a funny message saying so
            if (!args[0]) {
                const image = new MessageAttachment('https://nekobot.xyz/imagegen/f96a3f8b-eec9-4002-ab79-e022726987a2.png');
                message.channel.send(image);
                return msg.delete();
            }
            // Fetch data and send the image
            axios.get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${args.join('%20')}`).then(response => {
                const image = new MessageAttachment(response.data.message);
                message.channel.send(image);
                msg.delete();
            }).catch (async err => {
                const db = require('../../db');
                const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
                console.log(`There was an error!\nError: ${err.stack}`);
                message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
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