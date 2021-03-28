import { PermissionString, Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Listener from "../../classes/Listener";
import Util from "../../classes/Util";

export default class MissingPermissionsListener extends Listener {
    public constructor() {
        super("missingPermissions", {
            emitter: "commandHandler",
            event: "missingPermissions",
            category: "commandHandler",
        });
    }

    public exec(
        message: Message,
        command: CustomCommand,
        type: string,
        missing: PermissionString[]
    ) {
        if (type === "user") {
            return message.channel.send(
                `You're missing the  **${Util.formatPermissions(
                    missing
                )}** permission(s), which are required by the \`${
                    command.id
                }\` command`
            );
        } else if (type === "client") {
            return message.channel.send(
                `The \`${
                    command.id
                }\` command could not be executed due to the fact that I am missing the **${Util.formatPermissions(
                    missing
                )}** permission(s)`
            );
        }
    }
}
