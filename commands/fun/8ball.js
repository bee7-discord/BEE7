const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Get a answer to your question!',
    category: 'Fun',
    timeout: 2000,
    usage: '8ball <question>',
    run: async (bot, message, args) => {
        try {
            if (!args[0]) return message.channel.send('Please specify a question to ask!');
            // Random list of questions
            const responses = [
                "Yes",
                "No",
                "Perhaps",
                "Why would you even think that would be a yes smh",
                "OF COURSE ITS A YES!",
            ];

            // Select a random response from that array
            const response =
                responses[Math.floor(Math.random() * responses.length - 1)];
            // Send a cool embed with the question and chosen answer
            const Embed = new MessageEmbed()
                .setTitle(`8Ball!`)
                .setDescription(`Your question: ${args.join(" ")}\nMy reply: ${response}`)
                .setColor(`RANDOM`);
            message.channel.send(Embed);
        // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};

