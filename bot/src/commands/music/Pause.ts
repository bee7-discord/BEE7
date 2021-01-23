import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class PauseCommand extends CustomCommand {
    public constructor() {
        super("pause", {
            aliases: ["pause"],
            category: "Music",
            description: {
                content: "Pause the current song",
                usage: "pause",
                examples: ["pause"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.channel.send("No music currently playing!");
        }

        if (!voice) {
            return message.channel.send(
                "You must be in a voice channel to pause music!"
            );
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.channel.send(
                "You must be in the same voice channel as me!"
            );
        }

        this.client.player.pause(message);
        return message.channel.send("Successfully paused the music!");
    }
}