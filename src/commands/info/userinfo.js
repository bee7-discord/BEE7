const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

const flags = {
    DISCORD_EMPLOYEE:
        "<:discord_staff:742129941428174980> Discord Employee <:discord_staff:742129941428174980>",
    DISCORD_PARTNER:
        "<:Discord_Verified:742132920000446545> Discord Partner <:Discord_Verified:742132920000446545>",
    BUGHUNTER_LEVEL_1:
        "<:BugHunter:742133045787754548> Bug Hunter (Level 1) <:BugHunter:742133045787754548>",
    BUGHUNTER_LEVEL_2:
        " <:BugHunter:742133045787754548>Bug Hunter (Level 2) <:BugHunter:742133045787754548>",
    HYPESQUAD_EVENTS: "HypeSquad Events",
    HOUSE_BRAVERY:
        "<:hypesquadbravery:742133019669692587> House of Bravery <:hypesquadbravery:742133019669692587>",
    HOUSE_BRILLIANCE:
        "<:hypesquad_briliance:742132962665037855> House of Brilliance <:hypesquad_briliance:742132962665037855>",
    HOUSE_BALANCE:
        "<:hypesquad_balance:742132891215200407> House of Balance <:hypesquad_balance:742132891215200407>",
    EARLY_SUPPORTER:
        "<:earlysupporter:742132937406939220> Early Supporter <:earlysupporter:742132937406939220>",
    TEAM_USER: "Team User",
    SYSTEM: "System",
    VERIFIED_BOT:
        "<:Discord_Verified:742132920000446545> Verified Bot <:Discord_Verified:742132920000446545>",
    VERIFIED_DEVELOPER:
        "<:Discord_Verified:742132920000446545> Verified Bot Developer <:Discord_Verified:742132920000446545>"
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "userinfo",
            description: "Get info about a user!",
            usage: "userinfo [user id or mention]",
            category: "Info",
            aliases: ["ui"]
        });
    }

    /**
     *
     * @param {Message} message - The message of the command
     * @param {String[]} args - The arguments of the command
     */

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        try {
            // Fetch the member, roles sorted and not everyone, user flags, and instantiate the embed
            const member =
                message.mentions.members.last() ||
                message.guild.members.cache.get(message.author) ||
                message.member;
            const roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map((role) => role.toString())
                .slice(0, -1);
            const userFlags = member.user.flags.toArray();
            const embed = new MessageEmbed()
                // Generate and send a really nice embed
                .setThumbnail(
                    member.user.displayAvatarURL({ dynamic: true, size: 4096 })
                )
                .setColor(
                    member.displayHexColor !== "#000000"
                        ? member.displayHexColor
                        : this.client.colors.transparent
                )
                .addField("__User__", [
                    `**Username:** ${member.user.username}`,
                    `**Discriminator:** ${member.user.discriminator}`,
                    `**ID:** ${member.id}`,
                    `**Flags:** ${
                        userFlags.length
                            ? userFlags.map((flag) => flags[flag]).join(", ")
                            : "None"
                    }`,
                    `**Avatar:** [Link to avatar](${member.user.displayAvatarURL(
                        { dynamic: true }
                    )})`,
                    `**Time Created:** ${moment(
                        member.user.createdTimestamp
                    ).format("LT")} ${moment(
                        member.user.createdTimestamp
                    ).format("LL")}, ${moment(
                        member.user.createdTimestamp
                    ).fromNow()}`,
                    `**Status:** ${member.user.presence.status.toUpperCase()}`,
                    `**Game:** ${
                        member.user.presence.game ||
                        "Not currently playing a game"
                    }`,
                    "\u200b"
                ])
                .addField("__Member__", [
                    `**Highest Role:** ${
                        member.roles.highest.id === message.guild.id
                            ? "None"
                            : member.roles.highest.name
                    }`,
                    `**Server Join Date:** ${moment(member.joinedAt).format(
                        "LL LTS"
                    )}`,
                    `**Hoist Role:** ${
                        member.roles.hoist ? member.roles.hoist.name : "None"
                    }`,
                    `**Roles [${roles.length}]:** ${
                        roles.length !== 0 ? roles.join(", ") : "No roles"
                    }`,
                    "\u200b"
                ]);
            message.channel.send(embed);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
