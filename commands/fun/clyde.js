// eslint-disable-next-line
const { MessageAttachment } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'clyde',
    category: 'Fun',
    description: 'Generate a clyde image',
    usage: 'clyde <text>',
    timeout: 5000,
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            // Fetch data and send the image
            const msg = await message.channel.send('<a:loading:721436743550763055>');
            if(!args[0]) return message.channel.send('Provide some text!');
            axios.get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join('%20')}`).then(response => {
                const image = new MessageAttachment(response.data.message, 'clyde.png');
                msg.delete();
                message.channel.send(image);
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