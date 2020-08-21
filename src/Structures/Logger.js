const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {
    /**
     * @description Log things to the console in a cool way
     *
     * @param {String} type - The type of message to log. Either info, database, command, or event.
     * @param {String} message - The message to log
     */
    log(type, message) {
        const time = `[${moment(new Date()).format("LTS")}]`;

        switch (type.toLowerCase()) {
            case "info":
                console.log(
                    `${time} [${chalk.hex("#24feff")("INFO")}] ${message}`,
                );
                break;
            case "database":
                console.log(
                    `${time} [${chalk.hex("#71518D")("DATABASE")}] ${message}`,
                );
                break;
            case "command":
                console.log(
                    `${time} [${chalk.hex("#47a428")("COMMAND")}] ${message}`,
                );
                break;
            case "event":
                console.log(
                    `${time} [${chalk.hex("#ec7014")("EVENT")}] ${message}`,
                );
                break;
        }
    }
};
