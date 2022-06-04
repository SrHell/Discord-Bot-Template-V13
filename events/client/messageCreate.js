const Discord = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const cooldowns = new Map();

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild) return
        if (message.channel.type === "dm") return
        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            return message.reply({ content: `Olá ${message.author}, meu prefixo nesse servidor é **${client.config.botPrefix}**\n> Basta utilizar: **${client.config.botPrefix}ajuda ou help**\n> Estou atualmente na versão **${client.config.bot_vers}**`, ephemeral: true }).then(async msg => {
                await wait(15000);
                msg.delete().catch(() => { });
            });
        }

        if(!message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const args = message.content.slice(client.config.botPrefix.length).trim().split(" ");

        let cmd = args.shift().toLowerCase();
        if (cmd.length == 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
        if (!command) {
            const cmdErrado = new Discord.MessageEmbed()
              .setDescription(`**COMANDO INVÁLIDO!** O comando não existe, verifique a ortografia. \`${client.config.botPrefix}help\`.`)
              .setColor('#F1C40F');
        
            return message.reply({ embeds: [cmdErrado] }).then(async msg => {
                await wait(5000);
                msg.delete().catch(() => { });
            });
        
          }

        // COMANDO SÓ PARA STAFF  
        if (command.ownerOnly === true) {
            if (message.author.id !== client.config.ownerID) {
                const staffCMD = new Discord.MessageEmbed()
                    .setDescription(`Este comando é só para **Administradores**.`)
                    .setColor("#F1C40F")
                return message.reply({ embeds: [staffCMD], allowedMentions: { repliedUser: false } });
            }
        }
        // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

        // COMANDO DESABILITADO
        if(command.disabled === true) {
            if (message.author.id !== client.config.ownerID) {
                const staffDSTV = new Discord.MessageEmbed()
                    .setDescription(`Comando está **Desabilitado** para testes.`)
                    .setColor("#F1C40F")
                return message.reply({ embeds: [staffDSTV], allowedMentions: { repliedUser: false } });
            }
        }
        // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        
       // COMANDO COOLDOWN
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const curTime = Date.now();
        const timeStamp = cooldowns.get(command.name);

        let cooldown = (command.cooldown) * 1000;
        if (!command.cooldown) cooldown = 3 * 1000;
        //const isPremium = await db.fetch(`premium_${message.author.id}`) //
        //if(isPremium) cooldown = cooldown / 2; //
        if (client.config.ownerID.includes(message.author.id)) cooldown = 0;

        if (timeStamp.has(message.author.id)) {
            const expTime = timeStamp.get(message.author.id) + cooldown;
            if (curTime < expTime) {
                const timeLeft = (expTime - curTime) / 1000;
                var remainder = Math.floor(timeLeft % 60); //seconds

                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor('#F1C40F')
                            .setDescription(`** Aguarde \`${remainder}\` segundos antes de usar este comando novamente**`) // ${timeLeft.toFixed(1)}
                    ]
                }).then(async msg => {
                    await wait(5000);
                    msg.delete().catch(() => { });
                });
            }
        }
        timeStamp.set(message.author.id, curTime);
        setTimeout(() => timeStamp.delete(message.author.id), cooldown);
        // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

        await command.run(client, message, args);
    }
}
