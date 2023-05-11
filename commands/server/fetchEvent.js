const {SlashCommandBuilder} = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
const Event = require('../../models/event.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('Find your event')
        .addStringOption(option =>
            option.setName("eventname")
                .setDescription("The Name of the Event")
                .setRequired(true)),
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
                    console.log(userEvent.dataValues);
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



