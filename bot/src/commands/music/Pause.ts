import { Message } from "discord.js";
import { CustomCommand } from "../../classes/Command";
import Util from "../../classes/Util";

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

        this.client.player.pause(message);
        return message.channel.send("Successfully paused the music!");
    }
}
