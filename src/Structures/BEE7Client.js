require("pretty-error").start();

const { Client, Collection } = require("discord.js");
const Logger = require("./Logger");
const Util = require("./Util.js");
const { KSoftClient } = require("@ksoft/api");
const client = require("alexflipnote.js");
const alexclient = new client();
const canvacord = require("canvacord");
const emojis = require("../../config/emojis.json");
const prefixSchema = require("../models/prefix");
const colors = require("../../config/colors.json");

module.exports = class BEE7Client extends Client {
    constructor(options = {}) {
        super({
            disableMentions: "everyone"
        });
        this.validate(options);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();
        this.utils = new Util(this);
        this.logger = new Logger();
        this.ksoft = new KSoftClient(options.ksoftKey);
        this.alexclient = alexclient;
        this.canva = canvacord;
        this.emoji = emojis;
        this.owners = ["444655632424108032"];
        this.prefixes = new Array();
        this.colors = colors;

        (async () => {
            const data = await prefixSchema.find({});
            data.forEach((guild) => {
                this.prefixes[guild.guildId] = guild.prefix;
            });
        })();
    }

    validate(options) {
        if (typeof options !== "object")
            throw new TypeError("Options should be a type of Object.");

        if (!options.token)
            throw new Error("You must pass the token for the client.");
        this.token = options.token;

        if (!options.prefix)
            throw new Error("You must pass a prefix for the client.");
        if (typeof options.prefix !== "string")
            throw new TypeError("Prefix should be a type of String.");
        this.prefix = options.prefix;
    }

    async start(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        super.login(token);
    }
};
