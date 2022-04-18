const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showalltags')
		.setDescription('Show All Tags (Placeholder)'),
    async execute(interaction) {
        const tagList = await Tags.findAll({ attributes: ['name'] })
        const tagString = tagList.map(t => t.name).join(', ') || 'No Tags Set.'
    
        return interaction.reply(`List of tags: ${tagString}`);
    },
};  