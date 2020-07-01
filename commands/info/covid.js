// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'covid',
    category: 'Info',
    description: 'Get the latest data on covid',
    usage: 'covid',
    timeout: 5000,
    aliases: ["covid19", "coronavirus"],
    // eslint-disable-next-line
    run: async(bot, message, args) => {
        try {
            const Embed = new MessageEmbed();
            if(!args[0]) {
                axios.get('https://disease.sh/v2/all').then(response => {
                    Embed.setTitle(`Covid cases for the world`);
                    Embed.setThumbnail(`https://www.pharmaceutical-technology.com/wp-content/uploads/sites/10/2020/02/coronavirus-2.jpg`);
                    Embed.addField(`**# of active cases**`, `${response.data.active}`, true);
                    Embed.addField(`**# of deaths today**`, `${response.data.todayDeaths}`, true);
                    Embed.addField(`**# of deaths total**`, `${response.data.deaths}`, true);
                    Embed.addField(`**Total # of critical cases**`, `${response.data.critical}`, true);
                    Embed.addField(`**Total # of recovered people**`, `${response.data.recovered}`, true);
                    Embed.addField(`**Total # of recovered people today**`, `${response.data.todayRecovered}`, true);
                    message.channel.send(Embed);
                });
            }
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
       }
    },
};