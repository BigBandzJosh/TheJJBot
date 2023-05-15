const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const Event = require('../../models/event.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('Find your event'),
            //It doesn't let you give the name capital letters for some reason

            
    async execute(interaction) {
        try {
            await interaction.reply(`Finding event...`);

            const userEvents = await Event.findAll({
                where: {
                    username: interaction.user.username,
                    
                },
              
            });
            if (userEvents.length > 0) {
                await interaction.editReply(`Event found!`);
                
                for (const userEvent of userEvents) {
                    const eventEmbed = new EmbedBuilder()
                        .setColor(global.embedColor)
                        .setTitle(`Event`)
                        .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                        .setDescription(`Event Name:  ${userEvent.dataValues.name}\n\nEvent Date:  ${userEvent.dataValues.date}\n\nEvent Time: ${userEvent.dataValues.reminder}\n\nEvent Description: ${userEvent.dataValues.eventDescription}`)
                        .setTimestamp();
                    
                    await interaction.followUp({ embeds: [eventEmbed] });
                }
                
            }
            
            else {
                await interaction.editReply(`Event not found!`);
            }
        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: "There was an error while executing this command!", ephemeral: true });

        }
    },
};



