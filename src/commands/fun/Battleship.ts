import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class PingCommand extends CustomCommand {
    public constructor() {
        super("battleship", {
            aliases: ["battleship"],
            category: "Fun",
            description: {
                content: "Create a new battleship game",
                usage: "battleship <mention of person to battle>",
                examples: ["battleship <@444655632424108032>"],
            },
        });
    }

    public exec(message: Message): Promise<Message> {
        return this.client.battleship.createGame(message);
    }
}
