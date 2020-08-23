const Event = require("../../../Structures/Event");
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Message } = require("discord.js");

module.exports = class extends Event {
    /**
     *
     * @param {Message} message - The Message
     */

    async run(message) {
        this.client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            image: message.attachments.first()
                ? message.attachments.first().proxyURL
                : null
        });
    }
};
