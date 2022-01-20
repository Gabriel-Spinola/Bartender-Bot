const text = require('../Texts')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cardapio')
		.setDescription('Mostra o cardapio'),
	async execute(interaction) {
		await interaction.reply(text.cardapio);
	},
};