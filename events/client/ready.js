module.exports = (bot) => {
    // Set the user activity, and console log that the bot is ready
    bot.user.setActivity(`beatzoid code me!`, { type: "WATCHING" });
    console.log(`${bot.user.username} is now online!`);
};