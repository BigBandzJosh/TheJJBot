const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of commands'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#fa2f6c')
            .setTitle('List of available commands.')
            .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Fun', value: 'Some value here' + '\n' + 'Some more Value', inline: true },
                { name: 'Utility', value: 'Some value here', inline: true },
            )
            .addFields({ name: 'Game', value: 'Some value here', inline: true })
            .setTimestamp()

            interaction.reply({ embeds: [helpEmbed] });
            
    },
};