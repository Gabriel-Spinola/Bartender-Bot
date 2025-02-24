const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

module.exports = function() { 
    const commands = []
    const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./Commands/${file}`);

        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}