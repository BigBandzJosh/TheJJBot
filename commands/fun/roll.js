const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice'),
    async execute(interaction) {
        try{
            // Pick a number between 1 and 6
        let num = Math.floor(Math.random() * 6) + 1;

        const rollEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`:game_die: You rolled a ${num}!`)

        await interaction.reply({ embeds: [rollEmbed] });
        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },
};