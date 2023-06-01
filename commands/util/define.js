const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Defines a given word')
        .addStringOption(option =>
            option.setName("word")
                .setDescription("The word you want the definition to")
                .setRequired(true)),

    async execute(interaction) {
        try{
            const word = interaction.options.getString("word")
        
        async function defineWord(word) {
            if (typeof word !== 'string') {
                
                return;
            }
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            return data;

        }
        const wordData = await defineWord(word);
        

        // Accessing the first definition object
        const definition = wordData[0].meanings[0].definitions[0].definition;
        

        const wordEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`:book: Definition for ${word}`)
            .addFields(
                { name: "Definition", value: definition },
            )
            .setTimestamp()    

        await interaction.reply({ embeds: [wordEmbed] });
        }catch(error){
            console.log(error);
            await interaction.reply({content: "Please enter a valid word", ephemeral: true});
        }
    },
};