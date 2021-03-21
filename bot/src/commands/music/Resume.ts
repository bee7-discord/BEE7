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
                examples: ["resume"],
            },
        });
    }

    public async exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.error("NO_MUSIC_PLAYING");
        }

        if (!voice) {
            return message.error("SAME_VOICE_CHANNEL");
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.error("SAME_VOICE_CHANNEL");
        }

        this.client.player.resume(message);
        return message.channel.send("Successfully resumed the music!");
    }
}
