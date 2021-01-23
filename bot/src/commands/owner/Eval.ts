import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import fetch from "node-fetch";

export default class EvalCommand extends CustomCommand {
    public constructor() {
        super("eval", {
            aliases: ["eval"],
            category: "Owner",
            description: {
                content: "Eval",
                usage: "eval",
                examples: ["eval"]
            },
            ownerOnly: true,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest"
                }
            ],
            ratelimit: 3
        });
    }

    async clean(client: any, text: string) {
        if (text && text.constructor.name == "Promise") text = await text;
        if (typeof text !== "string")
            text = require("util").inspect(text, {
                depth: 1
            });

        let data = await fetch("https://api.snowflakedev.xyz/api/token", {
            headers: {
                Authorization: this.client.botConfig.snowflakeApiKey
            }
        });
        data = await data.json();
        const token = (data as any).token;

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, token);

        return text;
    }

    hastebin(input: any, extension?: any) {
        return new Promise(function (res, rej) {
            if (!input) rej("[Error] Missing Input");
            fetch("https://hasteb.in/documents", {
                method: "POST",
                body: input
            })
                .then((res) => res.json())
                .then((body) => {
                    res(
                        "https://hasteb.in/" +
                            body.key +
                            (extension ? "." + extension : "")
                    );
                })
                .catch((e) => rej(e));
        });
    }

    public async exec(
        message: Message,
        { code }: { code: string }
    ): Promise<Message> {
        try {
            const evaled = eval(code);
            const clean = await this.clean(this.client, evaled);

            if (clean.length > 800)
                return message.channel.send(await this.hastebin(clean));
            else return message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            return message.channel.send(
                `\`\`\`js\n${await this.clean(
                    this.client,
                    `${err.name}: ${err.message}`
                )}\n\`\`\``
            );
        }
    }
}
