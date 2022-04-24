const fs = require('fs')
const texts = require('./Texts');
const deployCommands = require('./deploy-commands')

const { Client, Intents, Collection, Presence } = require('discord.js')
const { token, prefix } = require('./config.json')
const { Tags } = require('./database')

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

deployCommands()

client.commands = new Collection()

// Create an array of command files
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./Commands/${ file }`)

    // Set a new item in the Collection
	// With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command)
}

client.once('ready', () => {
	console.log('Ready!')

    Tags.sync({ force: true /* Recreate the database table every time on startup. */}) 
    //Tags.sync()
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) { 
        return;
    }

	const command = client.commands.get(interaction.commandName)

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction)
    }
    catch (error) {
        console.log(error)

        await interaction.reply({ 
            content: 'Eita! Houve um erro ao executar o seu pedido, pode fala com a administração que ele resolvem seu problema .',
            ephemeral: true 
        })
    }
})

client.on('messageCreate', async message => {
    if (message.content === `${ prefix }cardapio`) {
        await message.reply({
            content: texts.cardapio,
        })
    }
})

client.login(token)