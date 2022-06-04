const { Client, Collection, Intents } = require('discord.js');
const handler = require("./handler/index");
const chalk = require("chalk");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

const Discord = require('discord.js');

// Chame o arquivo .env para obter o token
require('dotenv').config()

module.exports = client;

// Variáveis globais
client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config')

// Grava comandos e eventos
handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// Error Handling
// ----------------------------------| Crash Logger:
process.on("uncaughtException", (err, origin) => {
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Uncaught Exception/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(err, origin);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Unhandled Rejection/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(promise, reason.message);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Multiple Resolves")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(type, promise, reason);
 });


// Login Discord Bot Token
client.login(process.env.TOKEN).catch(() => console.log(chalk.red("[ERROR] Foi fornecido um token de cliente inválido ou intenções ausentes.")));;
