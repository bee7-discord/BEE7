module.exports = async (bot, message) => {
    // Link blocker
    const inviteLinkRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
    if (inviteLinkRegex.test(message.content)) {
        await message.delete({ timeout: 1000 });
        await message.channel.send(
            `${message.author} **you cannot post links from other servers here!**`,
        );
    }
};