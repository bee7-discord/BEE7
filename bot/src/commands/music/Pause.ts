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
                examples: ["pause"],
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.error("NO_MUSIC_PLAYING");
        }

        if (!voice) {
            return message.error("NO_VOICE_CHANNEL");
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.error("SAME_VOICE_CHANNEL");
        }

        this.client.player.pause(message);
        return message.channel.send("Successfully paused the music!");
    }
}
