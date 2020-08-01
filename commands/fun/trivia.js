/* eslint-disable brace-style */
// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const { Client } = require("opendtb-wrapper");

module.exports = {
    name: "trivia",
    category: "Fun",
    description: "Test your knowledge",
    usage: "trivia",
    timeout: 5000,
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        try {
            const msg = await message.channel.send(
                "<a:loading:721436743550763055>",
            );
            // Fetch a question
            Client.get().then(async (response) => {
                console.log(`Got trivia command response, detecting type...`);

                const embed = new MessageEmbed();
                if (response.type === "boolean") {
                    // If the type is a boolean, make a embed saying the question, true or false, and how to actually answer
                    console.log(`Type is a boolean!`);

                    embed.setTitle(response.content);
                    embed.setDescription(
                        response.answers.map(
                            (a, i) =>
                                `**${String.fromCharCode(
                                    97 + i,
                                ).toUpperCase()}:** ${a}\n`,
                        ),
                    );
                    embed.addField(
                        `\u200b`,
                        `Respond with either **true** or **false**. You have \`15\` seconds, good luck!`,
                    );
                    embed.setColor("#2f3136");
                    msg.delete();
                    message.channel.send(embed);

                    console.log(`Sent embed, awaiting answer...`);

                    const msgs = await message.channel.awaitMessages(
                        (u2) => u2.author.id === message.author.id,
                        { time: 15000, max: 1 },
                    );

                    // If the user didn't answer in time, return a message
                    if (msgs.size === 0) {
                        console.log(
                            `User didn't answer in time! Sending message...`,
                        );
                        return message.channel.send(
                            `You didn't answer in time!`,
                        );
                    }

                    // If the person got it correct, send a message. Otherwise, say they got it wrong
                    if (msgs.first().content === response.correctOption) {
                        console.log(`User got it correct! Sending message...`);
                        message.channel.send(
                            `:tada: You got it correct! :tada:`,
                        );
                    } else {
                        console.log(`User got it wrong :(. Sending message...`);
                        message.channel.send(
                            `:frowning: You got it wrong. F in the chat.`,
                        );
                    }
                } else {
                    console.log(`Type is multiple choice!`);

                    embed.setTitle(response.content);
                    embed.setDescription(
                        response.answers.map(
                            (a, i) =>
                                `**${String.fromCharCode(
                                    97 + i,
                                ).toUpperCase()}:** ${a}\n`,
                        ),
                    );
                    embed.addField(
                        `\u200b`,
                        `Respond with the correct **letter** next to the answer. You have \`15\` seconds, good luck!`,
                    );
                    embed.setColor("RANDOM");
                    msg.delete();
                    message.channel.send(embed);

                    console.log(`Sent embed, awaiting answer...`);
                    const msgs = await message.channel.awaitMessages(
                        (u2) => u2.author.id === message.author.id,
                        { time: 15000, max: 1 },
                    );

                    if (msgs.size === 0) {
                        console.log(
                            `User didn't answer in time! Sending message...`,
                        );
                        return message.channel.send(
                            `You didn't answer in time!`,
                        );
                    }

                    if (
                        msgs.first().content.toUpperCase() ===
                        response.correctOption
                    ) {
                        console.log(`User got it correct! Sending message...`);
                        message.channel.send(
                            `:tada: You got it correct! :tada:`,
                        );
                    } else {
                        console.log(`User got it wrong :(. Sending message...`);
                        message.channel.send(
                            `:frowning: You got it wrong. F in the chat.`,
                        );
                    }
                }
            });
            // eslint-disable-next-line brace-style
        } catch (err) {
            const db = require("../../db");
            const prefix = (await db.get(`Prefix_${message.guild.id}`))
                ? await db.get(`Prefix_${message.guild.id}`)
                : "!";
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(
                `**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`,
            );
        }
    },
};
