const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Replies with the changelog!'),
    async execute(interaction) {
        try{
            await interaction.reply(`Fetching changelog...`);

            const changelogEmbed = new EmbedBuilder()
                .setColor(global.embedColor)
                .setTitle(`Changelog`)
                .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setDescription("Must implement this feature!")
                .setTimestamp();


            await interaction.editReply({ embeds: [changelogEmbed] });


            

           

        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },
};
