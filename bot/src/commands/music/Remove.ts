import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class RemoveCommand extends CustomCommand {
    public constructor() {
        super("remove", {
            aliases: ["remove"],
            category: "Music",
            description: {
                content: "Remove a song from the queue",
                usage: "remove <number of song in queue>",
                examples: ["remove 3", "remove 5"],
            },
            args: [
                {
                    id: "track",
                    type: "string",
                    default: null,
                },
            ],
            userPermissions: (msg: Message) => {
                if (!msg.member.permissions.has("MANAGE_GUILD"))
                    return msg.channel.send(
                        "You need the `Manage Server` permission to run this command"
                    );
            },
            ratelimit: 3,
        });
    }

    public exec(
        message: Message,
        { track }: { track: string }
    ): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        if (!queue) {
            return message.channel.send("No music currently playing!");
        }

        if (!track || isNaN(parseInt(track))) {
            return message.channel.send(
                "Incorrect usage! You must specify a track to remove: `remove <track number>`"
            );
        }

        const removed = this.client.player.remove(message, +track);
        if (!removed) {
            return message.channel.send(
                "Could not find that track in the queue!"
            );
        }

        message.channel.send(
            `Successfully removed \`${removed.title}\` from the queue`
        );

        if (!queue.tracks[0]) {
            this.client.player.stop(message);
            return message.channel.send(
                "Music stopped as there is no more music in the queue!"
            );
        }
    }
}
