const Command = require("../../Structures/Command");
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

const filterLevels = {
    "DISABLED": "Off",
    "MEMBERS_WITHOUT_ROLES": "No Role",
    "ALL_MEMBERS": "Everyone"
};

const verificationLevels = {
    "NONE": "None",
    "LOW": "Low",
    "MEDIUM": "Medium",
    "HIGH": "(╯°□°）╯︵ ┻━┻",
    "VERY_HIGH": "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
};

const regions = {
    "brazil": "Brazil",
    "europe": "Europe",
    "hongkong": "Hong Kong",
    "india": "India",
    "japan": "Japan",
    "russia": "Russia",
    "singapore": "Singapore",
    "southafrica": "South Africa",
    "sydney": "Sydney",
    "us-central": "US Central",
    "us-east": "US East",
    "us-west": "US West",
    "us-south": "US South"
};
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "serverinfo",
            description: "Get info about the current server",
            usage: "serverinfo",
            category: "Info",
            aliases: ["si"]
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
            // Get the roles in order, members, channels, and emojis
            const emojis = message.guild.emojis.cache;
            const members = message.guild.members.cache;
            // Display the info in a really nice embed
            const embed = new MessageEmbed()
                .setTitle(`**Guild information for __${message.guild.name}__**`)
                .setColor("BLUE")
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField(
                    "\u200b",
                    [
                        `**Name**: ${message.guild.name}`,
                        `**Owner:** ${message.guild.owner}`,
                        `**Region:** ${regions[message.guild.region]}`
                    ],
                    true
                )
                .addField(
                    "\u200b",
                    [
                        `**Boost Tier:** ${
                            message.guild.premiumTier
                                ? `Tier ${message.guild.premiumTier}`
                                : "None"
                        }`,
                        `**Explicit Filter:** ${
                            filterLevels[message.guild.explicitContentFilter]
                        }`,
                        `**Verification Level:** ${
                            verificationLevels[message.guild.verificationLevel]
                        }`
                    ],
                    true
                )
                .addField(
                    "\u200b",
                    [
                        `**Time Created:** ${moment(
                            message.guild.createdTimestamp
                        ).format("LT")}, ${moment(
                            message.guild.createdTimestamp
                        ).format("LL")}, ${moment(
                            message.guild.createdTimestamp
                        ).fromNow()}`
                    ],
                    true
                )
                .addField(
                    "\u200b",
                    [
                        `**Total Channel Count:** ${message.guild.channels.cache.size}`,
                        `**Text Channels:** ${
                            message.guild.channels.cache.filter(
                                (channel) => channel.type === "text"
                            ).size
                        }`,
                        `**Voice Channels:** ${
                            message.guild.channels.cache.filter(
                                (channel) => channel.type === "voice"
                            ).size
                        }`
                    ],
                    true
                )
                .addField(
                    "\u200b",
                    [
                        `**Emoji Count:** ${emojis.size}`,
                        `**Regular Emoji Count:** ${
                            emojis.filter((emoji) => !emoji.animated).size
                        }`,
                        `**Animated Emoji Count:** ${
                            emojis.filter((emoji) => emoji.animated).size
                        }`
                    ],
                    true
                )
                .addField(
                    "\u200b",
                    [
                        `**Member Count:** ${message.guild.memberCount}`,
                        `**Humans:** ${
                            members.filter((member) => !member.user.bot).size
                        }`,
                        `**Bots:** ${
                            members.filter((member) => member.user.bot).size
                        }`,
                        "\u200b"
                    ],
                    true
                )
                .addField(
                    "Presence",
                    [
                        `**<:online:731319127654006855> Online:** ${
                            members.filter(
                                (member) => member.presence.status === "online"
                            ).size
                        }`,
                        `**<:idle:731319127385440308> Idle:** ${
                            members.filter(
                                (member) => member.presence.status === "idle"
                            ).size
                        }`,
                        `**<:dnd:731319127678910524> Do Not Disturb:** ${
                            members.filter(
                                (member) => member.presence.status === "dnd"
                            ).size
                        }`,
                        `**<:offline:731319127704207472> Offline:** ${
                            members.filter(
                                (member) => member.presence.status === "offline"
                            ).size
                        }`
                    ],
                    true
                )
                .setTimestamp();
            message.channel.send(embed);
        } catch (err) {
            this.client.utils.handleError(err, message);
        }
    }
};
