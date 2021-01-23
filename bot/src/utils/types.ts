export interface BotOptions {
    token: string;
    owners: string | string[];
    prefix: string;
    devMode: boolean;
    mongoURI?: string;
    nodes: Array<any>;
}

export interface PublicConfig {
    transparentColor: string;
}
