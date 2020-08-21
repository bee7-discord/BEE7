const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const { inspect } = require("util");
const { stripIndents } = require("common-tags");
const { VultrexHaste } = require("vultrex.haste");
const haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "eval",
            description: "eval",
            usage: "eval",
            category: "Owner"
        });
    }

    /**
     *
     * @param {Message} message - The message of the command
     * @param {String[]} args - The arguments of the command
     */

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        try {
            if (!args.join(" ")) {
                return message.channel.send("Can't evaluate `air`!");
            }
            let output;
            output = eval(args.join(" "));
            if (
                output
                    .toString()
                    .includes(require("../../../config/bot.json").token)
            ) {
                output =
                    "Bruh why tf would you do that just use the dev console smh.";
            }
            if (typeof output !== "string") {
                output = inspect(output, { depth: 2 });
            }

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
    }
};
