// eslint-disable-next-line no-unused-vars
const BEE7Client = require("./BEE7Client");

module.exports = class Event {
    /**
     *
     * @param {BEE7Client} client - The Client
     * @param {String} name - The name of the event
     * @param {String} options - The options
     * @param {Boolean} options.once - Wether or not the event is once
     */
    constructor(client, name, options = {}) {
        this.name = name;
        this.client = client;
        this.type = options.once ? "once" : "on";
        this.emitter =
            (typeof options.emitter === "string"
                ? this.client[options.emitter]
                : options.emitter) || this.client;
    }

    // eslint-disable-next-line no-unused-vars
    async run(...args) {
        throw new Error(
            `The run method has not been implemented in ${this.name}`
        );
    }
};
