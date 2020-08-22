/* eslint-disable no-unused-vars */
const { Permissions } = require("discord.js");
const BEE7Client = require("./BEE7Client");

module.exports = class Command {
    /**
     *
     * @param {BEE7Client} client - The Discord client
     * @param {String} name - The name of the commands
     * @param {Object} options - The options for the command
     * @param {Array} options.aliases - Aliases for the command
     * @param {String} options.description - Description of the command
     * @param {String} options.category - Category of the command
     * @param {String} options.usage - Usage of the command
     * @param {Permissions} options.permission - Permission of the command
     */
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided.";
        this.category = options.category || "Miscellaneous";
        this.usage = options.usage || "No usage provided.";
        this.permission = options.permission || "No permission required";
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        throw new Error(`Command ${this.name} doesn't provide a run method!`);
    }
};
