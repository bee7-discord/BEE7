module.exports = {
    name: "support",
    category: "Info",
    description: "Join the support server!",
    usage: "support",
    timeout: 10000,
    aliases: ["report"],
    // eslint-disable-next-line no-unused-vars
    run: async (bot, message, args) => {
        // If you don't know how this works then idk honestly
        message.channel.send(
            `**Join this server to report bugs and/or suggest new features for the bot!**\nhttps://discord.gg/AunkyAe`,
        );
    },
};
