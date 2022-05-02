const { SlashCommandBuilder } = require('@discordjs/builders');
const { ytdl } = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('é um play :)')
        .addStringOption(option => option.setName('name').setDescription('wdwdw')),
    async execute(interaction) {

        const queue = new Map();

        const namesong = interaction.options.getString('name')
        
        

        async function init(message) {
            
            const voicechannel = message.member.voice.channel
            if(!voicechannel) {
                return message.channel.send(
                " POR AMABILIDADE, ('caps') CONDuza-se para a reunião virtual, para que assim, todavia, 'pozzamos' gozar de seu requinte gosto à arte musical "
                );
            } else {
                return await voicechannel.join();
            }
        
        }

        init(interaction)
    },
};