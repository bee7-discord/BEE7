const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "wikihow",
            description: "Get a funny wikihow article",
            usage: "wikihow",
            category: "Fun"
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
            this.client.ksoft.images.wikihow().then((res) => {
                const embed = new MessageEmbed()
                    .setTitle(res.article.title)
                    .setURL(res.article.link)
                    .setImage(res.url)
                    .setFooter(`Powered by api.ksoft.si`)
                    .setColor(`#2f3136`);
                message.channel.send(embed);
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
