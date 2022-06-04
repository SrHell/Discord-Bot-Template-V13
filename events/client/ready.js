const { version } = require('discord.js');
const process = require('node:process');
const chalk = require('chalk');
const ms = require('ms');

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        setTimeout(async function () {
            console.log(chalk.grey(`\n[+] Conectado...`))
        }, ms("0.2s"));
        setTimeout(async function () {
            console.log(chalk.green(`═════════════════════════════════════════════════════════════════════════════════`))
            console.log(chalk.green(`☰ [LOGS] ${client.user.tag} Está online!`))
            console.log(chalk.green(`☰ [LOGS] Cuidando de ${client.users.cache.size} membros.`))
            console.log(chalk.green(`═════════════════════════════════════════════════════════════════════════════════`))

        }, ms("1s"));

        let activities = [
            `Prefixo: ${client.config.botPrefix}`,
            `Usuário: ${client.users.cache.size}`,
            `Canais: ${client.channels.cache.size}`,
            `Dono: @IamSrHell#9961`,
            `Node: ${process.version}`,
            `Discord.js: ${version}`
        ],
            i = 0;
        setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
            type: "WATCHING",
            url: "https://www.twitch.tv/iamsrhell"
        }), 5000); //WATCHING, LISTENING, PLAYING, STREAMING
    }
}
