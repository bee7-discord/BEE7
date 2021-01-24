export interface BotOptions {
    token: string;
    owners: string | string[];
    prefix: string;
    devMode: boolean;
    snowflakeApiKey: string;
}

export interface PublicConfig {
    transparentColor: string;
}
