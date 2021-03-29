import { GuildMember, MessageCollector } from "discord.js";
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

// Battleship

export interface Board {
    data: string;
    ship: string;
    cords: {
        letter: string;
        number: number;
        cord: string;
    };
}

export interface Boat {
    name: string;
    length: number;
    hits: number;
    sunk: boolean;
}

export interface Cords {
    letter: string;
    number: number;
    cord: string;
}

export interface Game {
    collector: MessageCollector | null;
    member: GuildMember;
    playerHitBoard: {
        data: string;
        ship: string;
        cords: {
            letter: string;
            number: number;
            cord: string;
        };
    }[][];
    playerShipBoard: {
        data: string;
        ship: string;
        cords: {
            letter: string;
            number: number;
            cord: string;
        };
    }[][];
    gameChannel: string;
    placedBoats: {
        name: string;
        length: number;
        hits: number;
        sunk: boolean;
    }[];
    gameMessages: {
        start: string;
        hits: string;
        boats: string;
    };
    ready: boolean;
}
