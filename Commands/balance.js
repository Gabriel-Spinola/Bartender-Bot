const { SlashCommandBuilder } = require('@discordjs/builders');
const currency = require('../index')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Mostra seu \'didin'),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user

        const user = currency.id(id)

        let balance = user ? user.balance : 0

        return await interaction.reply(`${ target.tag } has ${ balance }💰`)
	},
}