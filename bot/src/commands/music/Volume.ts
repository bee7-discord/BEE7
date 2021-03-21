import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Util from "../../classes/Util";

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
            ratelimit: 3,
        });
    }

    public async exec(
        message: Message,
        { volume }: { volume: number }
    ): Promise<Message> {
        const queue = this.client.player.getQueue(message);

        const voice = message.member.voice.channel;

        if (!queue) {
            return message.channel.send(
                Util.errorEmbed({
                    description: "No music currently playing!",
                })
            );
        }

        if (!voice) {
            return message.channel.send(
                Util.errorEmbed({
                    description:
                        "You must be in a voice channel to use this command!",
                })
            );
        }

        if (voice.id !== queue.voiceConnection.channel.id) {
            return message.channel.send(
                Util.errorEmbed({
                    description: "You must be in the same voice channel as me!",
                })
            );
        }

        this.client.player.setVolume(message, volume);
        return message.channel.send(
            `Successfully set the volume to ${volume}%`
        );
    }
}
