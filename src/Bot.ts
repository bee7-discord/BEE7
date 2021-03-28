import "./utils/extenders";
import { Config, PublicConfig } from "./Config";
import BEE7Client from "./classes/BEE7Client";

const client: BEE7Client = new BEE7Client(Config, PublicConfig);
client.start();
