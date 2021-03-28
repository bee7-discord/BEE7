import { Document } from "mongoose";

export interface BotOptions {
    token: string;
    owners: string | string[];
    prefix: string;
    devMode: boolean;
    snowflakeApiKey: string;
}

export interface PublicConfig {
    transparentColor: string;
    emojis: any;
}

export interface Settings {
    prefix: string;
    modActions: Array<Object>;
}

export interface GuildConfigType extends Document {
    settings: Settings;
}

export const Errors = {
    NO_VOICE_CHANNEL: "You must be in a voice channel to use this command",
    NO_MUSIC_PLAYING: "No songs currently playing",
    SAME_VOICE_CHANNEL: "You must be in the same voice channel as me",
};
