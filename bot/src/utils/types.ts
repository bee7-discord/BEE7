export interface BotOptions {
    token: string;
    owners: string | string[];
    prefix: string;
    devMode: boolean;
    mongoURI?: string;
}

export interface PublicConfig {
    transparentColor: string;
}