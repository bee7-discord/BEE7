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
                examples: ["stop"],
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
            return message.error("NO_VOICE_CHANNEL");
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.error("SAME_VOICE_CHANNEL");
        }

        this.client.player.stop(message);
        return message.channel.send("Successfully stopped the music!");
    }
}
