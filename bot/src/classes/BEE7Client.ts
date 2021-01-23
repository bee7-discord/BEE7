import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Intents, Message } from "discord.js";
import mongoose from "mongoose";
import { join } from "path";
import { Logger } from "winston";
import { Config } from "../Config";
import GuildConfig from "../models/GuildConfig";
import logger from "../utils/logger";
import { PublicConfig, BotOptions } from "../utils/types";
import { Player } from "discord-player";
import { MessageEmbed } from "discord.js";
import { Util } from "discord.js";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        config: PublicConfig;
        player: Player;
    }
}

export default class BEE7Client extends AkairoClient {
    public botConfig: BotOptions;
    public config: PublicConfig;
    public logger: Logger = logger;
    public player = new Player(this);

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "events")
    });
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: async (msg: Message) => {
            if (msg.guild) {
                const config: any = await GuildConfig.findOne({
                    guildId: msg.guild.id
                }).exec();
                if (!config) {
                    await GuildConfig.create({
                        guildId: msg.guild.id,
                        settings: { prefix: Config.prefix }
                    });
                    return Config.prefix;
                }
                return config.settings.prefix
                    ? config.settings.prefix
                    : Config.prefix;
            }
            return Config.prefix;
        },
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string =>
                    `${str}\n\nType \`cancel\` to cancel the command`,
                modifyRetry: (_: Message, str: string): string =>
                    `${str}\n\nType \`cancel\` to cancel the command`,
                timeout: "You look too long, command has now been cancelled.",
                ended:
                    "You exceeded the maximum amount of tries, this command has been cancelled",
                cancel: "This command has been cancelled",
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: Config.owners
    });

    public constructor(botConfig: BotOptions, config: PublicConfig) {
        super({
            ownerID: botConfig.owners,
            ws: { intents: Intents.ALL }
        });

        this.botConfig = botConfig;
        this.config = config;
    }

    private _registerMusicEvents(): void {
        this.player
            .on("trackStart", (message, track) =>
                message.channel.send(
                    `Now playing \`${track.title}\` requested by \`${track.requestedBy.tag}\`!`
                )
            )
            .on("trackAdd", (message, _, track) =>
                message.channel.send(
                    `\`${track.title}\` has been added to the queue!`
                )
            )
            .on("playlistAdd", (message, _, playlist) =>
                message.channel.send(
                    `\`${playlist.title}\` has been added to the queue (\`${playlist.tracks.length}\` songs), requested by \`${playlist.requestedBy.tag}\``
                )
            )
            .on("searchResults", (message, query, tracks) => {
                const embed = new MessageEmbed()
                    .setAuthor(`Here are your search results for ${query}!`)
                    .setDescription(
                        tracks.map(
                            (t, i) =>
                                `${i + 1}. ${Util.escapeMarkdown(t.title)}`
                        )
                    )
                    .setColor(this.config.transparentColor)
                    .setFooter("Send the number of the song you want to play!");
                message.channel.send(embed);
            })
            .on(
                "searchInvalidResponse",
                (message, _, tracks, content, collector) => {
                    if (content === "cancel") {
                        collector.stop();
                        return message.channel.send("Search cancelled!");
                    }

                    message.channel.send(
                        `You must send a valid number between 1 and ${tracks.length}!`
                    );
                }
            )
            .on("searchCancel", (message) =>
                message.channel.send(
                    "You did not provide a valid response, please send the command again!"
                )
            )
            .on("noResults", (message, query) =>
                message.channel.send(
                    `No results found on YouTube for \`${query}\`!`
                )
            )

            .on("queueEnd", (message) =>
                message.channel.send(
                    "Music stopped as there is no more music in the queue!"
                )
            )
            .on("channelEmpty", (message) =>
                message.channel.send(
                    "Music stopped as everyone has left the voice channel!"
                )
            )
            .on("botDisconnect", (message) =>
                message.channel.send(
                    "Music stopped as I have been disconnected from the channel!"
                )
            )
            .on("error", (error, message) => {
                switch (error) {
                    case "NotPlaying":
                        message.channel.send(
                            "There is no music being played on this server!"
                        );
                        break;
                    case "NotConnected":
                        message.channel.send(
                            "You are not connected to any voice channel!"
                        );
                        break;
                    case "UnableToJoin":
                        message.channel.send(
                            "I am not able to join your voice channel, please check my permissions!"
                        );
                        break;
                    case "LiveVideo":
                        message.channel.send(
                            "YouTube live videos are not supported!"
                        );
                        break;
                    default:
                        message.channel.send(
                            `Something went wrong, error: \`${error}\``
                        );
                }
            });
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();

        mongoose
            .connect(
                Config.devMode
                    ? "mongodb://127.0.0.1:27017/BEE7"
                    : Config.mongoURI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: true
                }
            )
            .then(() => this.logger.info("MongoDB Connected!"))
            .catch((err) => this.logger.error(err));

        this._registerMusicEvents();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(this.botConfig.token);
    }
}
