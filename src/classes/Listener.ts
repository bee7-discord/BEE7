import { Listener, ListenerOptions } from "discord-akairo";
import { Config, PublicConfig } from "../Config";
import BEE7Client from "./BEE7Client";

export default class CustomListener extends Listener {
    constructor(id: string, options?: ListenerOptions) {
        super(id, options);
        this.client = new BEE7Client(Config, PublicConfig);
    }
}
