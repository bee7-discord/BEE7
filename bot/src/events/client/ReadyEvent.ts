import CustomListener from "../../classes/Listener";
import logger from "../../utils/logger";

export default class ReadyEvent extends CustomListener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client",
        });
    }

    public exec(): void {
        logger.info(`${this.client.user.tag} is now online and ready!`);
    }
}
