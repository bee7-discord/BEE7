import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class EvalCommand extends CustomCommand {
    public constructor() {
        super("eval", {
            aliases: ["eval"],
            category: "Owner",
            description: {
                content: "Eval",
                usage: "eval",
                examples: ["eval"],
            },
            ownerOnly: true,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                },
            ],
            ratelimit: 3,
        });
    }

    async clean(client: any, text: string) {
        if (text && text.constructor.name == "Promise") text = await text;
        if (typeof text !== "string")
            text = require("util").inspect(text, {
                depth: 1,
            });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "[Redacted]");

        return text;
    }

    public async exec(
        message: Message,
        { code }: { code: string }
    ): Promise<Message> {
        try {
            if (!code)
                return message.channel.send("Provide some code to eval!");

            // const evaled = eval(`(async () => {${code}})();`);
            const evaled = eval(code);
            const clean = await this.clean(this.client, evaled);

            if (clean.length > 800)
                return message.channel.send("Over 800 characters!");
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
