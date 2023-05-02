const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice'),
    async execute(interaction) {
        // Pick a number between 1 and 6
        let num = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`:game_die: You rolled a ${num}!`);
    },
};