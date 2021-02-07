import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import axios from "axios";
import { MessageEmbed } from "discord.js";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("npm", {
            aliases: ["npm"],
            category: "Info",
            description: {
                content: "Get info about a specific npm package on npm",
                usage: "npm <package name>",
                examples: ["npm canvacord"],
            },
            args: [
                {
                    id: "query",
                    type: "string",
                    match: "rest",
                },
            ],
            ratelimit: 3,
        });
    }

    public async exec(
        message: Message,
        { query }: { query: string }
    ): Promise<Message> {
        if (!query)
            return message.channel.send(`Incorrect usage! | \`npm <query>\``);

        await message.react(this.client.config.emojis.loadingEmoji);

        axios
            .get(
                `https://api.snowflakedev.xyz/api/registry/npm?module=${query}`,
                {
                    headers: {
                        Authorization: this.client.botConfig.snowflakeApiKey,
                    },
                }
            )
            .then(async (res) => {
                await message.reactions.removeAll();

                return message.channel.send(
                    new MessageEmbed()
                        .setAuthor("NPM", res.data.icon)
                        .setColor(this.client.config.transparentColor)
                        .addField(
                            "Name:",
                            `${res.data.module.name} ([Link](${res.data.url}))`
                        )
                        .addField("Description: ", res.data.module.description)
                        .addField(
                            "Maintainer(s): ",
                            res.data.module.maintainers.join(", ")
                        )
                        .addField("Version: ", res.data.module.version)
                );
            })
            .catch(async (err) => {
                if (err.response.data.code === 404) {
                    await message.reactions.removeAll();
                    return message.channel.send("Package not found!");
                }
            });
    }
}
