# Setup
<a href="https://nodejs.org/dist/v16.14.0/node-v16.14.0-x64.msi">Instale NodeJS</a>
Altere os valores do aquivo `config.js`
Crie um arquivo `.env` para a token do seu bot.
Após a instalação do node JS, e as configurações acima realizadas, agora é só instalar as dependências. `npm i`


## Exemplo do comando by Don
```js
const Discord = require("discord.js");

module.exports = {
    name: "say",
    aliases: [""],
    category: "Geral",
    description: "Falar com o bot!",
    ownerOnly: false,
    disabled: false,
    cooldown: 20,

    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed()
            .setDescription(`\`${client.config.botPrefix}say [mensagem]\``)
            .setColor("RANDOM")
        if (!args.join(' ')) return message.reply({ embeds: [embed] })

        let sayEMBED = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dyanmic: true }) })
            .setDescription(args.join(" "))
            .setTimestamp()
            .setColor("RANDOM")
        message.delete().catch(O_o => { });

        message.channel.send({ embeds: [sayEMBED] })
    }
}

```

## Créditos
<a href="https://github.com/locus-solutions">locus-solutions</a>
<a href="https://github.com/Expectatives">Expectatives</a>
