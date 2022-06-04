const Discord = require("discord.js")

module.exports = {
    name: "ping",
    category: "Utilitário",
    description: "Verifique o ping do bot!",
    ownerOnly: false,
    
    run: async (client, interaction, args) => {

        let don = new Discord.MessageEmbed()
        .setColor("#36393e")
        .setDescription(`**\\📡 Meu ping está em** \`${client.ws.ping}ms\`**.**`);

        interaction.reply({ embeds: [don], ephemeral: true })

    }
}
// Script by Don
