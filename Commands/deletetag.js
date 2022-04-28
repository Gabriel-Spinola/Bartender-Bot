const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database')
const { roles } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletetag')
		.setDescription('Show All Tags (Placeholder)'),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(roles.devs))
            return;

        // equivalent to: SELECT name FROM tags;
        const tagList = await Tags.findAll({ attributes: ['name'] /* if left blank, it will fetch *all* of the associated column data */ })
    
        // Map the tags get their name attribute (string), and separate then by a comma, if there's no tag output "No Tags Set"
        const tagString = tagList.map(t => t.name).join(', ') || 'No Tags Set.'
    
        return interaction.reply(`List of tags: ${tagString}`);
    },
};  