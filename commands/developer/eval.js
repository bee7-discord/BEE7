/* eslint-disable no-inner-declarations */
// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");
const { stripIndents } = require("common-tags");
const { VultrexHaste } = require("vultrex.haste");
const haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports = {
    name: "eval",
    category: "Owner",
    description: "no",
    usage: "no",
    timeout: 5000,
    ownerOnly: true,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            if (!args.join(" "))
                return message.channel.send("Can't evaluate `air`!");
            let output;
            output = eval(args.join(" "));
            if (output.toString().includes(bot.token))
                output =
                    "Bruh why tf would you do that just use the dev console smh.";
            if (typeof output !== "string")
                output = inspect(output, { depth: 2 });

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
