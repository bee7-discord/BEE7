import {
    Structures,
    Client,
    TextChannel,
    DMChannel,
    NewsChannel,
    Message as DiscordMessage,
} from "discord.js";
import { Config } from "../Config";
import GuildConfig from "../models/GuildConfig";
import { Errors, GuildConfigType } from "./types";

// Whenever you add/remove any property from any structure please update the types below
declare module "discord.js" {
    interface Guild {
        prefix: Promise<string>;
    }
    interface Message {
        error(errorCode: keyof typeof Errors): Promise<Message>;
    }
}

Structures.extend("Guild", (Guild) => {
    class CustomGuild extends Guild {
        constructor(client: Client, data: Object) {
            super(client, data);
        }

        private async getPrefix(): Promise<string> {
            const config = (await GuildConfig.findOne({
                guildId: this.id,
            }).exec()) as GuildConfigType;

            if (!config) {
                await GuildConfig.create({
                    guildId: this.id,
                    settings: { prefix: Config.prefix },
                });
                return Config.prefix;
            }

            return config.settings.prefix
                ? config.settings.prefix
                : Config.prefix;
        }

        get prefix(): Promise<string> {
            return this.getPrefix();
        }
    }

    return CustomGuild;
});

Structures.extend("Message", (Message) => {
    class CustomMessage extends Message {
        constructor(
            client: Client,
            data: Object,
            channel: TextChannel | DMChannel | NewsChannel
        ) {
            super(client, data, channel);
        }

        public error(errorCode: keyof typeof Errors): Promise<DiscordMessage> {
            return this.channel.send(Errors[errorCode]);
        }
    }

    return CustomMessage;
});
