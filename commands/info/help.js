/* eslint-disable brace-style */
const { MessageEmbed } = require("discord.js");
const db = require('../../db');

module.exports = {
    name: 'help',
    description: 'Get a list of all commands',
    usage: 'help [command]',
    category: 'Info',
    timeout: 3000,
    // eslint-disable-next-line no-unused-vars
    run: async (bot, message, args) => {
        try {
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';

            // If the person is trying to find out more info about a command, and the command exists then display info about that command
            if (args[0] && bot.commands.has(args[0])) {
                const cmd = bot.commands.get(args[0]);

                const embed = new MessageEmbed()
                    .setAuthor(`${cmd.name} | Help`, bot.user.displayAvatarURL())
                    .setColor("#2f3136")
                    .setDescription(`**Name: ** ${cmd.name}\n**Description: ** ${cmd.description}\n**Usage: ** ${prefix}${cmd.usage}\n**Aliases: ** ${cmd.aliases ? cmd.aliases.join(', ') : 'None'}`)
                    .setFooter("<> = required, [] = optional");
                return message.channel.send(embed);
            }

            // Make a new embed
            const embed = new MessageEmbed();
            embed.setTitle(`**Categories**`);
            embed.setFooter(`Bot made by Beatzoid#6969 - Logo made by Hailyy#0666 - Reactions time out in 120 seconds`, bot.user.displayAvatarURL());
            embed.setColor("#2f3136");
            embed.setDescription(`⚙ - Config\n\n🔘 - Reaction Roles\n\n🎈 - Fun\n\nℹ - Info\n\n🆙 - Leveling\n\n🔨 - Moderation\n\n🔧 - Utility`);

            // msg.delete();
            // return message.channel.send(embed);

            const helpMsg = await message.channel.send(embed);
            await helpMsg.react('🏠');
            await helpMsg.react('🔘');
            await helpMsg.react('⚙');
            await helpMsg.react('🎈');
            await helpMsg.react('🆙');
            await helpMsg.react('🔨');
            await helpMsg.react('🔧');

            const filter = (reaction, user) => {
                return reaction.emoji.name === '⚙' || reaction.emoji.name === '🏠' || reaction.emoji.name === '🔘' || reaction.emoji.name === '🎈' || reaction.emoji.name === '🆙' || reaction.emoji.name === '🔨' || reaction.emoji.name === '🔧' && user.id === message.author.id;
            };

            const collector = helpMsg.createReactionCollector(filter, { time: 120000 });

            collector.on('collect', (reaction, user) => {
                reaction.users.remove(user.id);
                switch (reaction.emoji.name) {
                    case '⚙':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Config').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🎈':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Fun').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🆙':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Levels').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🔨':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Moderation').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🔧':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Utility').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🔘':
                        helpMsg.edit(new MessageEmbed({
                            description: bot.commands.filter(cmd => cmd.category === 'Reaction Roles').map(x => `${x.name} - ${x.description}\n\n`).join(''),
                        }));
                        break;
                    case '🏠':
                        helpMsg.edit(embed);
                        break;
                }
            });

            collector.on('end', () => {
                helpMsg.edit(`Selector timed out! Run the help command to create a new one`);
            });


        } catch (err) {
            const prefix = await db.get(`Prefix_${message.guild.id}`) ? await db.get(`Prefix_${message.guild.id}`) : '!';
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(`**ERROR!**\nThere was an error trying to run this command:\`${err.message}\`\nPlease do \`${prefix}support\`, join the support server, and report this error ASAP!`);
        }
    },
};