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
        for (const commandUsage of commandUsages) {

            const date = new Date(commandUsage.dataValues.updatedAt);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = ('0' + date.getDate()).slice(-2);
            const hour = ('0' + date.getHours()).slice(-2);
            const minute = ('0' + date.getMinutes()).slice(-2);
            const ampm = hour < 12 ? 'AM' : 'PM';
            const formattedDate = `${year}-${month}-${day} || ${hour % 12}:${minute}${ampm}`;

           

            const commandDataEmbed = new EmbedBuilder()
                .setColor(global.embedColor)
                .setTitle(`Command Usage Data`)
                .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setDescription(`CommandName:  ${commandUsage.dataValues.commandName}\n\nCommandUsage:  ${commandUsage.dataValues.usageCount}\n\nlastUsed: ${formattedDate}`)
                .setTimestamp();




            
            await interaction.followUp( { embeds: [commandDataEmbed] });
        }

        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }  
    },
};