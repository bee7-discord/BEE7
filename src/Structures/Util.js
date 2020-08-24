const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const Command = require("./Command.js");
const Event = require("./Event.js");
const { MessageEmbed } = require("discord.js");
// eslint-disable-next-line no-unused-vars
const BEE7Client = require("./BEE7Client.js");

module.exports = class Util {
    /**
     *
     * @param {BEE7Client} client - Client
     */
    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return (
            typeof input === "function" &&
            typeof input.prototype === "object" &&
            input.toString().substring(0, 5) === "class"
        );
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    formatBytes(bytes) {
        if (bytes === 0) return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
            sizes[i]
        }`;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    /**
     *
     * @param {String} string - The string to capitalize
     */

    capitalise(string) {
        return string
            .split(" ")
            .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
            .join(" ");
    }

    handleError(err, message) {
        console.log(err);
        message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setTitle("ERROR!")
                .setDescription(
                    `\`\`\`js\n${err.message}\n\`\`\`\nPlease run the \`support\` command and report this error!`
                )
        );
    }

    async loadCommands() {
        return glob(`${this.directory}commands/**/*.js`).then((commands) => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File))
                    throw new TypeError(
                        `Command ${name} doesn't export a class.`
                    );
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command))
                    throw new TypeError(
                        `Command ${name} doesn't belong in the commands folder`
                    );
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    }
                }
                this.client.logger.log("command", `Command ${name} loaded`);
            }
        });
    }

    async loadEvents() {
        return glob(`${this.directory}events/**/*.js`).then((events) => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File))
                    throw new TypeError(
                        `Event ${name} doesn't export a class!`
                    );
                const event = new File(this.client, name);
                if (!(event instanceof Event))
                    throw new TypeError(
                        `Event ${name} doesn't belong in Events`
                    );
                this.client.events.set(event.name, event);
                event.emitter[event.type](name, (...args) =>
                    event.run(...args)
                );
                this.client.logger.log("event", `Event ${name} loaded`);
            }
        });
    }
};
