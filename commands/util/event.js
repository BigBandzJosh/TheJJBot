const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('event')
    .setDescription('Create an event'),
    async execute(interaction) {

        const modal = new ModalBuilder() // Create the modal
        .setTitle('Event Creation') // Set the title of the modal
        .setCustomId('event') // Set the custom ID of the modal

        // Event Name Input
        const eventName = new TextInputBuilder()
        .setCustomId('eventName') // Custom ID to identify the input
        .setRequired(true) // Make the input required
        .setLabel('Event Name') // Sets the label of the input
        .setStyle(TextInputStyle.Short) // Makes the input a short text input


        // Event Description Input
        const eventDesc = new TextInputBuilder()
        .setCustomId('eventDesc') // Custom ID to identify the input
        .setRequired(true) // Make the input required
        .setLabel('Event Description') // Sets the label of the input
        .setStyle(TextInputStyle.Short) // Makes the input a short text input

        // Action Rows [ Add your text inputs to the action rows ]
        const firstActionRow = new ActionRowBuilder().addComponents(eventName)
        const secondActionRow = new ActionRowBuilder().addComponents(eventDesc)
        
        modal.addComponents(firstActionRow, secondActionRow) // Add your action rows to the modal

        interaction.showModal(modal) // Show the modal to the user

    }
};