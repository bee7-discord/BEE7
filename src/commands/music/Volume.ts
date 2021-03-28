import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";

export default class VolumeCommand extends CustomCommand {
    public constructor() {
        super("volume", {
            aliases: ["volume"],
            category: "Music",
            description: {
                content: "Change the volume of the bot",
                usage: "volume <new volume between 1-100>",
                examples: ["volume 50", "volume 70"],
            },
            args: [
                {
                    id: "volume",
                    type: "number",
                    default: null,
                },
            ],
        });
    }

    public async exec(
        message: Message,
        { volume }: { volume: number }
    ): Promise<Message> {
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

        this.client.player.setVolume(message, volume);
        return message.channel.send(
            `Successfully set the volume to ${volume}%`
        );
    }
}
