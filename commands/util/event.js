const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('event')
    .setDescription('Create an event'),
    async execute(interaction) {
        const modal = new ModalBuilder()
        .setTitle('Event Creation')
        .setCustomId('event')

        // Event Name Input
        const eventName = new TextInputBuilder()
        .setCustomId('eventName')
        .setRequired(true)
        .setLabel('Event Name')
        .setStyle(TextInputStyle.Short)



        const eventDesc = new TextInputBuilder()
        .setCustomId('eventDesc')
        .setRequired(true)
        .setLabel('Event Description')
        .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(eventName)
        const secondActionRow = new ActionRowBuilder().addComponents(eventDesc)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)

    }
};