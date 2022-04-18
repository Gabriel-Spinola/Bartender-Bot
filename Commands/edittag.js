const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database')
const { roles } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edittag')
		.setDescription('Edit Tag')
        .addStringOption(option => option.setName('name').setDescription('Enter a name'))
        .addStringOption(option => option.setName('description').setDescription('Enter a description')),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(roles.devs))
            return;

        const tagName = interaction.options.getString('name');
	    const tagDescription = interaction.options.getString('description');

        // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
        const affectRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } })
    
        if (affectRows > 0) {
            return interaction.reply(`Tag ${tagName} was edited`)
        }
    
        return interaction.reply(`Could not find a tag with name: ${tagName}`);
    },
};  