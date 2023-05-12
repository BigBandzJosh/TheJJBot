const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Replies with the changelog!'),
    async execute(interaction) {
        try{
            await interaction.reply(`Fetching changelog...`);
            await interaction.editReply(`Must implement this feature!`);
        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },
};
