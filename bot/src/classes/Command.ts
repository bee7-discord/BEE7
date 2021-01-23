import { CommandOptions } from "discord-akairo";
import { Command } from "discord-akairo";
import BEE7Client from "./BEE7Client";
import { Config, PublicConfig } from "../Config";

export class CustomCommand extends Command {
    constructor(id: string, options?: CommandOptions) {
        super(id, options);
        this.client = new BEE7Client(Config, PublicConfig);
    }
}
