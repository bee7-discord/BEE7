import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class StopCommand extends CustomCommand {
    public constructor() {
        super("stop", {
            aliases: ["stop", "s"],
            category: "Music",
            description: {
                content: "Stop the currently playing music",
                usage: "stop",
                examples: ["stop"]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.channel.send("No music currently playing!");
        }

        if (!voice) {
            return message.channel.send(
                "You must be in a voice channel to use this command!"
            );
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.channel.send(
                "You must be in the same voice channel as me!"
            );
        }

        this.client.player.stop(message);
        return message.channel.send("Successfully stopped the music!");
    }
}
