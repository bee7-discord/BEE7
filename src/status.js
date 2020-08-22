const client = new (require("discord.js").Client)();

client.login(require("../config/bot.json").statusToken);

client.on("ready", () => {
    console.log(`${client.user.username} is online and ready to watch bee7!`);
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if (
        !["725519717233590292", "718621799499300936"].includes(
            newPresence.member.id
        )
    )
        return; //checks if your bot is the one that is updated

    if (newPresence.status != "offline") return; //checks if your bot is offline.
    const owner = client.users.cache.get("444655632424108032"); //gets your user
    owner.send(`${newPresence.user.tag} has just gone offline`);
});
