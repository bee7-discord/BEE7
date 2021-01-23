import { BotOptions, PublicConfig as PubConfig } from "./utils/types";

export const Config: BotOptions = {
    token: "ODAyMDE5ODY2NTI1Njk2MDUw.YApJNA.SMNleol5S451VUR35vqafOYH8hM",
    prefix: "?",
    owners: ["444655632424108032"],
    // DO NOT SET THIS TO FALSE UNLESS YOU ARE RUNNING IT ON THE VPS
    // I DO NOT WANT TO HAVE TO CLEAN UP THE PRODUCTION DATABASE
    devMode: true,
    mongoURI:
        "mongodb+srv://Beatzoid:PhZWzKB3BRrQnvmX@bee7.1vebl.mongodb.net/data?retryWrites=true&w=majority"
};

export const PublicConfig: PubConfig = {
    transparentColor: "#2F3136"
};
