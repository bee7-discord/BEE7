const chalk = require("chalk");
const moment = require("moment");
const DiscordLog = require("discord.log");
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const discord = new DiscordLog(
    "https://discordapp.com/api/webhooks/746770525510041631/17uC_UJaQUPVHSHMJ78vMvasMscem_SFQ9FBWHWlH1udpVlISuHVqnFYCcIjS_zB20vk"
);

module.exports = class Logger {
    /**
     * @description Log things to the console in a cool way
     *
     * @param {String} type - The type of message to log. Either info, database, command, or event.
     * @param {String} message - The message to log
     * @param {Message} discordMessage - The discord message
     */
    log(type, message, discordMessage = null) {
        const time = `[${moment(new Date()).format("LTS")}]`;

        if (discordMessage) {
            console.log(
                `${time} [${chalk.hex("#47a428")("COMMAND")}] Command ${
                    discordMessage.content
                } ran by ${discordMessage.author.username} (${
                    discordMessage.author.id
                }) in guild ${discordMessage.guild.name} (${
                    discordMessage.guild.id
                })`
            );

            discord.log({
                username: "BEE7 Logging",
                message: `${time} [COMMAND] Command \`${discordMessage.content}\` ran by \`${discordMessage.author.username}\` (${discordMessage.author.id}) in guild \`${discordMessage.guild.name}\` (${discordMessage.guild.id})`
            });
            return;
        }

        switch (type.toLowerCase()) {
            case "info":
                console.log(
                    `${time} [${chalk.hex("#24feff")("INFO")}] ${message}`
                );

                discord.log({
                    username: "BEE7 Logging",
                    message: `${time} [INFO] ${message}`
                });

                break;
            case "database":
                console.log(
                    `${time} [${chalk.hex("#71518D")("DATABASE")}] ${message}`
                );

                break;
            case "command":
                console.log(
                    `${time} [${chalk.hex("#47a428")("COMMAND")}] ${message}`
                );

                break;
            case "event":
                console.log(
                    `${time} [${chalk.hex("#ec7014")("EVENT")}] ${message}`
                );
                break;
        }
    }
};
