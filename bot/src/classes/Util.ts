import { MessageEmbed } from "discord.js";
import { MessageEmbedOptions } from "discord.js";

export default class Util {
    public static errorEmbed(data: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({
            ...data,
            description: `<a:no:746766970212450387> ${data.description}`,
            color: "RED",
        });
    }

    public static convertTime(duration: number): string {
        const portions: string[] = [];

        const msInHour = 1000 * 60 * 60;
        const hours = Math.trunc(duration / msInHour);
        if (hours > 0) {
            portions.push(hours + "h");
            duration = duration - hours * msInHour;
        }

        const msInMinute = 1000 * 60;
        const minutes = Math.trunc(duration / msInMinute);
        if (minutes > 0) {
            portions.push(minutes + "m");
            duration = duration - minutes * msInMinute;
        }

        const seconds = Math.trunc(duration / 1000);
        if (seconds > 0) {
            portions.push(seconds + "s");
        }

        return portions.join(" ");
    }

    public static getBoolean(value: string): boolean {
        switch (value.trim()) {
            case "true":
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }

    public static titleCase(convert: string): string {
        return convert
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}
