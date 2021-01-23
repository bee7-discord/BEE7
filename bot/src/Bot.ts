import { Config, PublicConfig } from "./Config";
import BEE7Client from "./classes/BEE7Client";
import logger from "./utils/logger";
import mongoose from "mongoose";

const client: BEE7Client = new BEE7Client(Config, PublicConfig);
client.start();

const events = [
    `exit`,
    `SIGINT`,
    `SIGUSR1`,
    `SIGUSR2`,
    `uncaughtException`,
    `SIGTERM`
];
events.forEach((event) => {
    process.on(event, async () => {
        logger.warn("Shutting down bot...");
        await mongoose.disconnect();
        client.destroy();
    });
});
