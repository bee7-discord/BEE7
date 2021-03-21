import { BotOptions, PublicConfig as PubConfig } from "./utils/types";

export const Config: BotOptions = {
    // The bot token
    token: "",
    // The bots prefix you want to use
    prefix: "?",
    // Put your owner id (and maybe other people's as well)
    owners: [""],
    // This only determines if the Mongo database is production or development
    devMode: true,
};

export const PublicConfig: PubConfig = {
    transparentColor: "#2F3136",
    emojis: {
        // This won't work on your own bot, you will need to change this
        loadingEmoji: "<a:loading:746197909401239552>",
    },
};
