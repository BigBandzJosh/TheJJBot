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
        const word = interaction.options.getString("word")
        console.log(word)
        async function defineWord(word) {
            if (typeof word !== 'string') {
                console.log("Word is not a string")
                return;
            }
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            return data;

        }
        const wordData = await defineWord(word);
        console.log(wordData[0].meanings[0].definitions[0])

        // Accessing the first definition object
        const definition = wordData[0].meanings[0].definitions[0].definition;
        const example = wordData[0].meanings[0].definitions[1].example;
        let synonyms = wordData[0].meanings[0].definitions[0].synonyms;
        
    

        console.log(`Definition: ${definition} \n Example: ${example} \n Synonyms: ${synonyms}`)
        console.log(wordData)
        // const wordData = await defineWord(word);
        // const definition = wordData[0].meanings[0].definitions[0].definition;
        // const example = wordData[0].meanings[0].definitions[0].example;
        // let synonyms = wordData[0].meanings[0].definitions[0].synonyms;

        // // Convert arrays to a string
        // if (Array.isArray(synonyms)) {
        //     synonyms = synonyms.join(', ');
        // }
        // if (Array.isArray(example)) {
        //     example = example.join(', ');
        // }
        // if (Array.isArray(definition)) {
        //     definition = definition.join(', ');
        // }

        // const wordEmbed = new EmbedBuilder()
        //     .setColor(global.embedColor)
        //     .setTitle(`:book: Definition for ${word}`)
        //     .addFields(
        //         { name: "Definition", value: definition },
        //         { name: "Example", value: example },
        //         { name: "Synonyms", value: synonyms }
        //     );


        // await interaction.reply({ embeds: [wordEmbed] });
    },
};