/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

const ZWS = "\u200B";

module.exports = class BEE7Embed extends MessageEmbed {
    splitFields(contentOrTitle, rawContent) {
        if (typeof contentOrTitle === "undefined") return this;

        let title;
        let content;
        if (typeof rawContent === "undefined") {
            title = ZWS;
            content = contentOrTitle;
        } else {
            title = contentOrTitle;
            content = rawContent;
        }

        if (Array.isArray(content)) content = content.join("\n");
        if (title === ZWS && !this.description && content.length < 2048) {
            this.description = content;
            return this;
        }

        let x;
        let slice;
        while (content.length) {
            if (content.length < 1024) {
                this.fields.push({
                    name: title,
                    value: content,
                    inline: false
                });
                return this;
            }
        }
    }
};
