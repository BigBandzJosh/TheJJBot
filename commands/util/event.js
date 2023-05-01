const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Creates an event.'),
    async execute(interaction) {
        await interaction.reply('Opening Event Creation Menu!'); // See index.js for event creation modal
    },
};