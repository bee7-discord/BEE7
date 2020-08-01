const { stripIndents } = require("common-tags");
const mongoose = require("mongoose");
const { uri } = require("../../config.json");
const { ErelaClient } = require("erela.js");

const nodes = [
    {
        host: "0.0.0.0",
        port: 2333,
        password: "prettyepicpasswordngl",
    },
];

module.exports = async (bot) => {
    // Console log that the bot is ready
    console.log(stripIndents`
    ${bot.user.username} logged in watching ${bot.users.cache.size} users in ${bot.guilds.cache.size} guilds.
    -----------------`);

    // Music
    bot.music = new ErelaClient(bot, nodes);
    // Listens to events.
    bot.music.on("nodeConnect", () => console.log("New node connected"));
    bot.music.on("nodeError", (node, error) =>
        console.log(`Node error: ${error.message}`),
    );
    bot.music.on("trackStart", (player, track) =>
        player.textChannel.send(stripIndents`
            <a:playing:733044212819558452> | Now playing: \`${track.title}\`
            <:youtube:733373756235579462> | Made by: \`${track.author}\` and requested by: \`${track.requester.username}\``),
    );
    bot.music.on("queueEnd", (player) => {
        player.textChannel
            .send("Queue has ended. Now leaving the VC...")
            .then((msg) => msg.delete({ timeout: 30000 }));
        bot.music.players.destroy(player.guild.id);
    });

    // Connect to mongo db
    mongoose
        .connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log(`Mongodb connected!\n-----------------`))
        .catch((err) => console.log(err));

    const statuses = [
        {
            type: "WATCHING",
            text: "beatzoid code me!",
        },
        {
            type: "WATCHING",
            text: "you ( ͡° ͜ʖ ͡°)",
        },
        {
            type: "WATCHING",
            text: "for rule breakers",
        },
    ];
    let i = Math.floor(Math.random() * (statuses.length - 1) + 1);
    bot.user.setActivity(statuses[i].text, { type: statuses[i].type });
    setInterval(() => {
        i = Math.floor(Math.random() * (statuses.length - 1) + 1);
        bot.user.setActivity(statuses[i].text, { type: statuses[i].type });
    }, 30000);
};
