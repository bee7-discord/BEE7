new (require("./Structures/BEE7Client"))(require("../config/bot.json")).start();

//#region Status Bot
const client = new (require("discord.js").Client)();
client.logger = new (require("./Structures/Logger"))();

client.login(require("../config/bot.json").statusToken);

client.on("ready", () => {
    client.logger.log(
        "info",
        `${client.user.username} is online and ready to watch bee7!`
    );
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

//#endregion Status Bot
