/* eslint-disable no-inner-declarations */
// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const humanizeDuration = require('humanize-duration');

module.exports = {
    name: 'create',
    category: 'Fun',
    description: 'Create a new giveaway.',
    usage: 'create <time> <channel mention> <prize>',
    timeout: 10000,
    aliases: ["c", "start"],
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Fetch the prefix from the db
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';

            // If there are no args 1, 2, or 3 show the correct usage
            if (!args[0] || !args[1] || !args[2]) return message.channel.send(`The correct usage for this command is \`${prefix}create <time> <channel mention> <prize>\`!`);

            // If args 0 doesn't end in d, h, m, or s send a message conveying that info
            if (!args[0].match("[dhms]")) return message.channel.send(`You did not use the correct formatting for the time! The valid options are \`d\`, \`h\`, \`s\`, or \`m\``);

            // If the time is not a number, send a message conveying that info
            if (isNaN(args[0][0])) return message.channel.send("That is not a number!");

            // if the time is less than 5 seconds, return a message conveying that info (this is because anything less than 5 literally breaks the time, idk why)
            if (args[0] <= 5) return message.channels.send(`The giveaway has to last more than 5 seconds!`);

            // Get the channel, and if there is no channel, send a message conveying that info
            const channel = message.mentions.channels.first();
            if (!channel) return message.channel.send("I could not find that channel in the guild!");

            // Get the prize, and if there is no prize then send a message conveying that info
            const prize = args.slice(2).join(" ");
            if (!prize) return message.channel.send("No prize specified!");
            // Send a message saying that the giveaway started
            message.channel.send(`*Giveaway created in ${channel}*`);

            // Send a cool embed saying what the prize is, how to enter, time remaining, giveaway hoster, and when it ends
            const Embed = new MessageEmbed()
                .setTitle(`${prize}`)
                .setDescription(`React with :tada: to enter!\nTime Remaining: **${humanizeDuration(ms(args[0]), { round: true })}**!\nHosted by: ${message.author}`)
                .setFooter("Ends at:")
                .setTimestamp(Date.now() + ms(args[0]))
                .setColor("BLUE");

            // Send the message and store it in a variable (important!)
            const m = await channel.send(Embed);

            // React to the message
            m.react("🎉");
            let i = ms(args[0]);
            // Make a function that counts down based on how much time is left
            function countdown() {
                i = i - 5000;
                const newEmbed = new MessageEmbed()
                    .setTitle(`${prize}`)
                    .setDescription(`React with :tada: to enter!\nTime Remaining: **${humanizeDuration(i, { round: true })}**!\nHosted by: ${message.author}`)
                    .setFooter("Ends at:")
                    .setTimestamp(Date.now() + ms(args[0]))
                    .setColor("BLUE");

                m.edit(newEmbed);
            }
            // Set the above function to run every 5 seconds (enough time so the bot doesn't get api rate limited or banned)
            const timer = setInterval(countdown, 5000);

            // When the giveaway ends, do this code
            setTimeout(() => {
                // Clear the time interval
                clearInterval(timer);
                // Edit the embed to say that the giveaway ended
                const newEmbed = new MessageEmbed()
                    .setTitle(`${prize}`)
                    .setDescription(`React with :tada: to enter!\nTime Remaining: **Giveaway over**!\nHosted by: ${message.author}`)
                    .setFooter("Ends at:")
                    .setTimestamp(Date.now() + ms(args[0]))
                    .setColor("RED");

                m.edit(newEmbed);
                // if no one reacted, then send a message conveying that info
                if (m.reactions.cache.get("🎉").count <= 1) {
                    return m.channel.send(`Not enough people reacted for me to draw a winner! :frowning:`);
                }

                // Select a random reaction from the message reactions
                const winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                // Send the winner, what they won, and the giveaway message link
                channel.send(`Congrats ${winner}, You have won ${prize}!\n(<https://discordapp.com/channels/${message.guild.id}/${channel.id}/${m.id}>)`);
            }, ms(args[0]));

            // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require('../../db');
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};