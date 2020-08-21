const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "meme",
            description: "Get a random reddit meme!",
            usage: "meme",
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
            const embed = new MessageEmbed();
            // Fetch a random meme from reddit
            this.client.ksoft.images.meme().then((response) => {
                embed.setTitle(response.post.title);
                embed.setURL(response.post.link);
                embed.setImage(response.url);
                embed.setFooter(
                    `👍 ${response.post.upvotes} 💬 ${response.post.comments} | Powered by api.ksoft.si`
                );
                embed.setColor("#2f3136");
                message.channel.send(embed);
            });
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
