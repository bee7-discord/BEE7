import { BotOptions, PublicConfig as PubConfig } from "./utils/types";

export const Config: BotOptions = {
    token: "ODAyMDE5ODY2NTI1Njk2MDUw.YApJNA.SMNleol5S451VUR35vqafOYH8hM",
    prefix: "?",
    owners: ["444655632424108032"],
    devMode: true,
    mongoURI:
        "mongodb+srv://Beatzoid:PhZWzKB3BRrQnvmX@bee7.1vebl.mongodb.net/data?retryWrites=true&w=majority",
    nodes: [
        {
            host: "localhost",
            port: 2333,
            password: "LaVaLiNk1@#"
        }
    ]
};

export const PublicConfig: PubConfig = {
    transparentColor: "#2F3136"
};
