/* eslint-disable no-inner-declarations */
// eslint-disable-next-line
const { MessageEmbed } = require('discord.js');const { inspect } = require('util');
const { stripIndents } = require('common-tags');
const { VultrexHaste } = require('vultrex.haste');
const haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports = {
    name: 'eval',
    category: 'Owner',
    description: 'Eval',
    usage: 'eval',
    timeout: 5000,
    aliases: [""],
    ownerOnly: true,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            // Get the start time
            const start = process.hrtime();
            // Eval the args
            let output = eval(args.join(" ")).toString();
            // if the output is the token, set the output to something else
            if(output.includes(bot.token)) output = "Bro just look in the config.json smh. Why would you use eval to see it.";
            // Get the time that it took
            const difference = process.hrtime(start);
            if (typeof output !== "string") output = inspect(output, { depth: 2 });

            // Return a message with the evaled args
            return message.channel.send(stripIndents`
            *Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*
            \`\`\`js
            ${output.length > 1950 ? await haste.post(output) : output}
            \`\`\`
        `);
            // eslint-disable-next-line brace-style
        } catch (err) {
            // if there is a error, return the error
            const start = process.hrtime();
            const difference = process.hrtime(start);
            return message.channel.send(stripIndents`
            *Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*
            \`\`\`js
            ${err}
            \`\`\`
            `);
        }
    },
};