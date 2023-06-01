// This command is used to fetch data from the database
const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const commandUsage = require('../../models/commandUsage.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Fetches your CommandUsage data!'),
    async execute(interaction) {
        try{
            await interaction.reply(`Fetching data...`);
        const commandUsages = await commandUsage.findAll({
            where: {
                userId: interaction.user.id,
            },
        });

        
        if (commandUsages.length === 0) {
            await interaction.editReply(`No commands used yet!`);
        }

        const embedBuilder = new EmbedBuilder()
                .setColor(global.embedColor)
                .setTitle(`Command Usage Data`)
                .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setDescription(`Command usage data for ${interaction.user.username}`)
                .addFields(
                    { name: "Command Name", value: `${commandUsages.map(commandUsage => commandUsage.commandName).join('\n')}`, inline: true },
                    { name: "Usage Count", value: `${commandUsages.map(commandUsage => commandUsage.usageCount).join('\n')}`, inline: true },  
                )
                .setTimestamp();
                await interaction.editReply({ embeds: [embedBuilder] });
                

        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }  
    },
};