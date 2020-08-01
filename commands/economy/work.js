// eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const money = require("../../models/money");
const { insertMoney } = require("../../functions");

module.exports = {
    name: "work",
    category: "Economy",
    description: "Work for money!",
    usage: "work",
    timeout: 3600000,
    timeoutMsg: "Bro give yourself a break. Wait {time} before working again.",
    // eslint-disable-next-line
    run: async (bot, message, args) => {
        let reason;
        let possibleAnswers;
        let index;
        let filter;
        let collector;

        try {
            const workNumber = Math.floor(Math.random() * 4);

            switch (workNumber) {
                case 1:
                    // Fill in the blank/hangman

                    // Possible Answers
                    possibleAnswers = [
                        {
                            prompt:
                                "What could go wrong if I push this to p _ _ _ _ _ _ _ _ _",
                            answer: "production",
                        },
                        {
                            prompt: "It's not my f _ _ _ _ that it broke",
                            answer: "fault",
                        },
                        {
                            prompt:
                                "What the h _ _ _ is wrong with JavaScript?",
                            answer: "hell",
                        },
                        {
                            prompt: "Sorry e _ _ _ _ _ _ _ for the downtime",
                            answer: "everyone",
                        },
                        {
                            prompt:
                                "I can't w _ _ _ to make this bot pay to win",
                            answer: "wait",
                        },
                        {
                            prompt: "Why is n _ _ _ _ _ _ working anymore",
                            answer: "nothing",
                        },
                    ];

                    // Pick a random answer
                    index = Math.floor(Math.random() * possibleAnswers.length);

                    // Filter the responses
                    filter = (response) => {
                        return response.author.id === message.author.id;
                    };

                    await message.channel.send(
                        `**Work for Developer** - Hangman - type the __full__ missing word in the following sentence.\n\`${possibleAnswers[index].prompt}\``,
                    );
                    collector = message.channel.createMessageCollector(filter, {
                        time: 15000,
                        errors: ["time"],
                    });

                    collector.on("collect", (m) => {
                        if (
                            possibleAnswers[index].answer !==
                            m.content.toLowerCase()
                        ) {
                            reason = "Incorrect";
                            collector.stop("incorrect");
                            return message.channel.send(
                                `Incorrect smh. Try again next time.`,
                            );
                        }

                        message.channel.send(
                            `Correct! You have earned \`100\` coins.`,
                        );
                        // Insert the money
                        insertMoney(100, money, message.author);
                        collector.stop("correct");
                    });

                    collector.on("end", (collected) => {
                        if (
                            possibleAnswers[index].answer ===
                                collected
                                    .map((x) => x.content.toLowerCase())
                                    .toString() ||
                            reason === "Incorrect"
                        )
                            return;
                        message.channel.send("Bruh at least respond smh.");
                    });
                    break;
                case 2:
                    // Memorize the color of the word
                    possibleAnswers = [
                        {
                            prompt:
                                "`🟩`Stackoverflow\n`🟥`Errors\n`🟦`Javascript\n",
                            question: "Javascript",
                            answer: "blue",
                        },
                        {
                            prompt:
                                "`🟩`Stackoverflow\n`🟥`Errors\n`🟦`Javascript\n",
                            question: "Errors",
                            answer: "red",
                        },
                        {
                            prompt:
                                "`🟩`Stackoverflow\n`🟥`Errors\n`🟦`Javascript\n",
                            question: "Stackoverflow",
                            answer: "green",
                        },
                        {
                            prompt:
                                "`🟩`Coding\n`🟥`Typescript\n`🟦`Debugging\n",
                            question: "Coding",
                            answer: "green",
                        },
                        {
                            prompt:
                                "`🟩`Coding\n`🟥`Typescript\n`🟦`Debugging\n",
                            question: "Typescript",
                            answer: "red",
                        },
                        {
                            prompt:
                                "`🟩`Coding\n`🟥`Typescript\n`🟦`Debugging\n",
                            question: "Debugging",
                            answer: "blue",
                        },
                    ];

                    // Pick a random answer
                    index = Math.floor(Math.random() * possibleAnswers.length);

                    filter = (response) => {
                        return response.author.id === message.author.id;
                    };

                    await message.channel
                        .send(
                            `**Work for developer** - Memorize the colors next to the words\n${possibleAnswers[index].prompt}`,
                        )
                        .then((m) => {
                            setTimeout(function () {
                                m.edit(
                                    `What color was next to the word \`${possibleAnswers[index].question}\`?`,
                                );
                            }, 3000);
                        });
                    collector = message.channel.createMessageCollector(filter, {
                        time: 15000,
                        errors: ["time"],
                    });

                    collector.on("collect", (m) => {
                        if (
                            possibleAnswers[index].answer !==
                            m.content.toLowerCase()
                        ) {
                            reason = "Incorrect";
                            collector.stop("incorrect");
                            return message.channel.send(
                                `Incorrect smh. Try again next time.`,
                            );
                        }

                        message.channel.send(
                            `Correct! You have earned \`100\` coins.`,
                        );
                        // Insert the money
                        insertMoney(100, money, message.author);

                        collector.stop("correct");
                    });

                    collector.on("end", (collected) => {
                        if (
                            possibleAnswers[index].answer ===
                                collected
                                    .map((x) => x.content.toLowerCase())
                                    .toString() ||
                            reason === "Incorrect"
                        )
                            return;
                        message.channel.send("Bruh at least respond smh.");
                    });

                    break;
                case 3:
                    // Repeat the phrase

                    possibleAnswers = [
                        {
                            prompt: "Why does nothing work anymore!",
                        },
                        {
                            prompt: "I test in production daily",
                        },
                        {
                            prompt:
                                "I'll just push this to production, what could go wrong?",
                        },
                    ];

                    // Pick a random answer
                    index = Math.floor(Math.random() * possibleAnswers.length);

                    filter = (response) => {
                        return response.author.id === message.author.id;
                    };

                    await message.channel.send(
                        `**Work for developer** - Repeat the following phrase:\n\`${possibleAnswers[index].prompt}\``,
                    );
                    collector = message.channel.createMessageCollector(filter, {
                        time: 15000,
                        errors: ["time"],
                    });

                    collector.on("collect", (m) => {
                        if (
                            possibleAnswers[index].prompt.toLowerCase() !==
                            m.content.toLowerCase()
                        ) {
                            reason = "Incorrect";
                            collector.stop("incorrect");
                            return message.channel.send(
                                `Incorrect smh. Try again next time.`,
                            );
                        }

                        message.channel.send(
                            `Correct! You have earned \`100\` coins.`,
                        );
                        // Insert the money
                        insertMoney(100, money, message.author);
                        reason = "correct";
                        collector.stop("correct");
                    });

                    collector.on("end", (collected) => {
                        if (
                            possibleAnswers[index].answer ===
                                collected
                                    .map((x) => x.content.toLowerCase())
                                    .toString() ||
                            reason === "Incorrect" ||
                            reason === "correct"
                        )
                            return;
                        message.channel.send("Bruh at least respond smh.");
                    });
                    break;
            }
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
