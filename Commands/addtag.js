const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database')
const { roles } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtag')
		.setDescription('Add Tag (Placeholder)')
        .addStringOption(option => option.setName('name').setDescription('Enter a name'))
        .addStringOption(option => option.setName('description').setDescription('Enter a description')),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(roles.devs))
            return;

        const tagName = interaction.options.getString('name')
        const tagDescription = interaction.options.getString('description')

        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: interaction.user.username,
            })

            return interaction.reply(`Tag ${ tag.name } added`)
        }
        catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exits')
            }

            return interaction.reply('Something went wrong with adding a tag' + '\n' + error)
        }
    },
};