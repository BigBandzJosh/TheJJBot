const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin'),
    async execute(interaction) {
        try{
            // Pick a number between 1 and 2
        let num = Math.floor(Math.random() * 2) + 1;
        // If the number is 1, it's heads. If it's 2, it's tails.
        let result = num === 1 ? 'Heads' : 'Tails';

        const flipEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`:coin: You flipped ${result}!`)
        
            await interaction.reply({ embeds: [flipEmbed] });
        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an eeor while executing this command!", ephemeral: true});
        }
    },
};