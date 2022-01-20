const Sequelize = require('sequelize')
const fs = require('fs')
const texts = require('./Texts');
const deployCommands = require('./deploy-commands')

const { Client, Intents, Collection, Presence } = require('discord.js')
const { token, prefix } = require('./config.json')

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
*/
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true.valueOf,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
})

deployCommands()

client.commands = new Collection()

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./Commands/${ file }`)

    // Set a new item in the Collection
	// With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command)
}

client.once('ready', () => {
	console.log('Ready!');
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
            content: 'Houve um erro ao executar o comando, fala com a administração que ele resolvem.',
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