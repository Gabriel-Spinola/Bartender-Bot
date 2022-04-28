const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('é um play :)')
        .addStringOption(option => option.setName('name').setDescription('wdwdw')),
    async execute(interaction) {
        await interaction.reply('iniciou a musca fi');
    },
};