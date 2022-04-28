const { SlashCommandBuilder } = require('@discordjs/builders');
const { ytdl } = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('é um play :)')
        .addStringOption(option => option.setName('name').setDescription('wdwdw')),
    async execute(interaction) {

        
        console.log(`${voicechannel}`);

        try{
            //voice channel
            if(!voicechannel) {
                await interaction.reply('Entre em algum canal de voz')
            }
            
            await interaction.reply(`musca iniciada ${interaction.user.username} no canal: ${voicechannel}`);

        } 
        catch(error) {
            await interaction.reply('Algo de errado não está certo');
        }
    },
};