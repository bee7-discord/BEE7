/* eslint-disable brace-style */
const humanizeDuration = require('humanize-duration');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const Timeout = new Map();

module.exports = async (bot, message, args, command) => {
    // Cooldown and run the command
    if (!command.timeout) return command.run(bot, message, args);

    const key = message.author.id + command.name;
    const found = Timeout.get(key);
    const timeout = command.timeout;

    // If the person is on cooldown, and the author id is not me (beatzoid), then display that information
    if (found && message.author.id !== '444655632424108032') {
        const timePassed = Date.now() - found;
        const timeLeft = timeout - timePassed;
        console.log(`${message.author.username} (${message.author.id}) has to wait ${timeLeft} before using ${command.name}`);

        const slowdownEmbed = new MessageEmbed()
            .setTitle(`Slow down!`)
            .setDescription(`You can use this command again in **${humanizeDuration(timeLeft, { round: true })}**.The default cooldown for this command is \`${ms(timeout)}\`.`)
            .setColor('#C40000')
            .setFooter(`Cooldown system made byJJNotLiveS#1053`);
        return message.channel.send(slowdownEmbed);
    // else run the command and add them to the cooldown
    } else {
        console.log(`${message.author.username} (${message.author.id}) in guild ${message.guild.name} (${message.guild.id}) executed command ${message.content}`);
        command.run(bot, message, args);
        Timeout.set(key, Date.now());

        setTimeout(() => {
            Timeout.delete(key);
        }, command.timeout);
    }
};