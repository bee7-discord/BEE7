import { BotOptions, PublicConfig as PubConfig } from "./utils/types";

export const Config: BotOptions = {
    token: "ODAyMDE5ODY2NTI1Njk2MDUw.YApJNA.SMNleol5S451VUR35vqafOYH8hM",
    prefix: "?",
    owners: ["444655632424108032"],
    // DO NOT SET THIS TO FALSE UNLESS YOU ARE RUNNING IT ON THE VPS
    // I DO NOT WANT TO HAVE TO CLEAN UP THE PRODUCTION DATABASE
    devMode: true,
    snowflakeApiKey:
        "NDQ0NjU1NjMyNDI0MTA4MDMy.MTYwNzU1ODc2MC4yMzQ=.ce8161a129dd949a784e8e8d723d057c"
};

export const PublicConfig: PubConfig = {
    transparentColor: "#2F3136",
    emojis: {
        loadingEmoji: "<a:loading:746197909401239552>"
    }
};
