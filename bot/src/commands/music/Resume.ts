import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class ResumeCommand extends CustomCommand {
    public constructor() {
        super("resume", {
            aliases: ["resume"],
            category: "Music",
            description: {
                content: "Resume the current song",
                usage: "Resume",
                examples: ["resume"]
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

        this.client.player.resume(message);
        return message.channel.send("Successfully resumed the music!");
    }
}
