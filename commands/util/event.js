const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
const {Event} = require('../../models/event.js');
const {reminderDate, date} = require('../../index.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Create an event')
        .addStringOption(option =>
            option.setName("eventname")
                .setDescription("The Name of the Event")
                .setRequired(true)),
    async execute(interaction, client) {
        const confirmEvent = new ButtonBuilder()
            .setCustomId('confirmEvent')
            .setLabel('Confirm Event')
            .setStyle(ButtonStyle.Success)

        const cancelEvent = new ButtonBuilder()
            .setCustomId('cancelEvent')
            .setLabel('Cancel Event')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents(confirmEvent, cancelEvent)



            await interaction.reply({
                content:`Are you sure you want to create an event called ${interaction.options.getString("eventname")}?`, 
                components: [row]
            })
            try {
                const event = await Event.create({
                    name: interaction.options.getString("eventname"),
                    date: `${date}`,
                    reminder: `${reminderDate}`,
                    username: interaction.user.username,
                    usage_count: 0,
                });
                console.log(`Event ${event.name} created`);
            } catch (err) {
                console.log("Error creating event");

            }
            if(global.isEventConfirm){
                await interaction.reply(`Event ${interaction.options.getString("eventname")} created!`)
            }      
    } 
}



