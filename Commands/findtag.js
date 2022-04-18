const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database')
const { roles } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('findtag')
		.setDescription('Show Tags (Placeholder)')
        .addStringOption(option => option.setName('name').setDescription('Enter a name')),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(roles.devs))
            return;

        const tagName = interaction.options.getString('name');

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: tagName } });

        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');
    
            return interaction.reply(`${tagName} found; description: ${tag.get('description')}`);
        }
    
        return interaction.reply(`Could not find tag: ${tagName}`);
    },
};  