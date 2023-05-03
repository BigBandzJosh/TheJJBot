const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Create an event')
        .addStringOption(option =>
            option.setName("eventname")
                .setDescription("The Name of the Event")
                .setRequired(true)),
    async execute(interaction) {
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
            if(global.isEventConfirm){
                await interaction.reply(`Event ${interaction.options.getString("eventname")} created!`)
            }
            
            
    }

    
}



