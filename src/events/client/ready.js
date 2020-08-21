const mongoose = require("mongoose");
const { uri } = require("../../../config/bot.json");
const Event = require("../../Structures/Event");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true,
        });
    }

    run() {
        // Console log that the bot is ready
        this.client.logger.log(
            "info",
            `Logged into discord as ${this.client.user.username}`,
        );

        // Connect to mongo db
        mongoose
            .connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
            })
            .then(this.client.logger.log("database", "MongoDB Connected!"))
            .catch((err) => console.log(err));

        const statuses = [
            {
                type: "WATCHING",
                text: "beatzoid code me!",
            },
            {
                type: "WATCHING",
                text: "you ( ͡° ͜ʖ ͡°)",
            },
            {
                type: "WATCHING",
                text: "for rule breakers",
            },
        ];

        let i = Math.floor(Math.random() * (statuses.length - 1) + 1);
        this.client.user.setActivity(statuses[i].text, {
            type: statuses[i].type,
        });
        setInterval(() => {
            i = Math.floor(Math.random() * (statuses.length - 1) + 1);
            this.client.user.setActivity(statuses[i].text, {
                type: statuses[i].type,
            });
        }, 30000);
    }
};
