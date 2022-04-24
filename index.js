const fs = require('fs')
const texts = require('./Texts');
const deployCommands = require('./deploy-commands')

const { Client, Intents, Collection, Presence } = require('discord.js')
const { token, prefix } = require('./config.json')
const { Tags } = require('./database');
//const { Users, CurrencyShop } = require('./dbObjects')
const { serialize } = require('v8');

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: '0.0.0.0/0',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

const CurrencyShop = require('./Models/CurrencyShop')(sequelize, Sequelize.DataTypes)
const UserItem = require('./Models/UserItem')(sequelize, Sequelize.DataTypes)
const Users = require('./Models/Users')(sequelize, Sequelize.DataTypes)

const force = process.argv.includes('--force') || process.argv.includes('-f')

const currency = new Collection()

Reflect.defineProperty(currency, 'add', {
    value: async (id, amount) => {
        const user = currency.get(id)

        if (user) {
            user.balance += Number(amount)

            return user.save()
        }

        const newUser = await Users.create({ user_id: id, balance: amount })
        currency.set(id, newUser)

        return newUser
    },
}) 

// NOTE If user is null return zero
Reflect.defineProperty(currency, 'getBalance', {
    value: id => {
        const user = currency.id(id)

        return user ? user.balance : 0
    }
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

client.once('ready', async () => {
	console.log('Ready!')
    const storedBalances = await Users.findAll()

    storedBalances.forEach(item => currency.set(item.user_id, item))

    Tags.sync({ force: true /* Recreate the database table every time on startup. */}) 
    //Tags.sync()
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) { 
        return
    }

	const command = client.commands.get(interaction.commandName)

    if (!command) {
        return
    }

    try {
        await command.execute(interaction)
    }
    catch (error) {
        console.log(error)

        await interaction.reply({ 
            content: 'Eita! Houve um erro ao executar o seu pedido, é só falar com a administração que eles resolvem seu problema.',
            ephemeral: true 
        })
    }
})

client.on('messageCreate', async message => {
    if (!message.author.bot) return

    currency.add(message.author.id, 1)
    
    if (message.content === `${ prefix }cardapio`) {
        await message.reply({
            content: texts.cardapio,
        })
    }
})

client.login(token)