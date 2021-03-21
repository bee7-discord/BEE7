import { BotOptions, PublicConfig as PubConfig } from "./utils/types";

export const Config: BotOptions = {
    // The bot token
    token: "ODAyMDE5ODY2NTI1Njk2MDUw.YApJNA.4Hk6Jh7ejZAh-3z4nUtRZspgYxA",
    // The bots prefix you want to use
    prefix: "?",
    // Put your owner id (and maybe other people's as well)
    owners: ["444655632424108032"],
    // This only determines if the Mongo database is production or development
    devMode: true,
    // If you don't want to get this, just remove the usage of it from Eval.ts
    snowflakeApiKey: "",
};

export const PublicConfig: PubConfig = {
    transparentColor: "#2F3136",
    emojis: {
        // This won't work on your own bot, you will need to change this
        loadingEmoji: "<a:loading:746197909401239552>",
    },
};
