const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'spaceimage',
    category: 'Fun',
    description: 'Get the NASA Space image of the day',
    usage: 'spaceimage',
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const fetchUrl = require("fetch").fetchUrl;
            let image;
            const msg = await message.channel.send('<a:loading:721436743550763055>');

            // Fetch teh space image of the day and send it in a embed
            fetchUrl("https://api.nasa.gov/planetary/apod?api_key=hXeYT5oOJy4LADt0k6UTWyZks1gaHyzakWENbG1r", async function (error, meta, body) {
                if (error) console.log(error);
                image = await JSON.parse(body).url;

                const Embed = new MessageEmbed()
                    .setTitle(`Space image of the day!`)
                    .setImage(image);

                msg.delete();
                message.channel.send(Embed);
                message.channel.send(`If there is no image, it is probably a video! Sorry bout that.`);
            });

        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};