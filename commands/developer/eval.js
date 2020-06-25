/* eslint-disable no-inner-declarations */
// eslint-disable-next-line
const { MessageEmbed } = require('discord.js'); const { inspect } = require('util');
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
            if (!args.join(' ')) return message.channel.send("Can't evaluate `air`!");
            let output = eval(args.join(" "));
            if (typeof output !== "string") output = inspect(output, { depth: 2 });

            return message.channel.send(stripIndents`
                \`\`\`js
                ${output.length > 1950 ? await haste.post(output) : output}
                \`\`\`
            `);
        // eslint-disable-next-line brace-style
        } catch (e) {
            return message.channel.send(stripIndents`
                Error:
                \`${e}\`
            `);
        }
    },
};