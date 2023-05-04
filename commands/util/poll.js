const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll')
        .addStringOption(option =>
            option.setName("pollquestion") // Required for the user to create the poll
                .setDescription("The Name of the Poll")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("pollruntime") // Required for the user to create the poll
                .setDescription("The Run Time of the Poll in Minutes (Ex: 5)")
                .setRequired(true)
                
        ),
    async execute(interaction) {
        // Get the poll name
        const pollName = interaction.options.getString("pollquestion");
        // Create the poll embed
        const pollEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`${pollName}`)

        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true }); // Send the poll message

        // Get the poll message ID
        const pollMessageID = interaction.fetchReply().id;
        
        // React to the poll message ID
        message.react('✅');
        message.react('⛔');
        

        // Get the poll run time
        const pollRunTime = interaction.options.getString("pollruntime");

        // Convert the poll run time to milliseconds
        const pollRunTimeMS = pollRunTime * 60000;

        function sleep(ms) { // define sleep function
            return new Promise(resolve => setTimeout(resolve, ms));
          }
        // Wait for the poll to end
        await sleep(pollRunTimeMS);

        // Get the poll message id
        const pollMessage = message.id

        const reactionManager = message.reactions.cache; // Get the reactions from the poll message


        // Loop through the reactions and get the count of the checkmark and no entry reactions
        let pollCheckMark = 0;
        let pollNoEntry = 0;
        reactionManager.forEach(reaction => {
            if (reaction.emoji.name === '✅') {
                pollCheckMark = reaction.count - 1;
            }
            if (reaction.emoji.name === '⛔') {
                pollNoEntry = reaction.count - 1;
            }
        });


        // Edit the poll message with the results
        const pollResultsEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`${pollName} Results`)
            .addFields({name: '✅', value: `${pollCheckMark}`, inline: true}, {name: '⛔', value: `${pollNoEntry}`, inline: true})
            .setTimestamp()

        await interaction.editReply({ embeds: [pollResultsEmbed] });



    },
};