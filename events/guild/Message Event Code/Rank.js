module.exports = async (bot, message) => {
    // Rank system
    const levelInfo = await bot.db.get(`level-${message.guild.id}-${message.author.id}`, {
        level: 1,
        xp: 0,
        totalXp: 0,
    });
    // Generate some xp
    const generatedXp = Math.floor(Math.random() * 4);
    // Add the generated xp to the users xp
    levelInfo.xp += generatedXp;
    // Add the generated xp to the total xp of the user
    levelInfo.totalXp += generatedXp;
    // If the user leveled up, increase their level by one, reset their xp, and send a message to the channel
    if (levelInfo.xp >= levelInfo.level * 40) {
        console.log(`${message.author.username} (${message.author.id}) leveled up!`);
        levelInfo.level++;
        levelInfo.xp = 0;
        message.reply(`GG! You have leveled up to **${levelInfo.level}**!`);
    }
    // Update the database
    await bot.db.set(`level-${message.guild.id}-${message.author.id}`, levelInfo);
};