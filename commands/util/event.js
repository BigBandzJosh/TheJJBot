const { SlashCommandBuilder } = require('@discordjs/builders');
const {ActionRowBuilder,ButtonBuilder, ButtonStyle } = require('discord.js');





module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Create an event')
        .addStringOption(option =>
            option.setName("eventname")
                .setDescription("The Name of the Event")
                .setRequired(true)),
    async execute(interaction, client) {
        try{
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

           

            global.eventTitleName = interaction.options.getString("eventname");
            
            console.log(eventTitleName);
            await interaction.reply({
                content:`Are you sure you want to create an event called ${eventTitleName}?`, 
                components: [row],   
            })

        }
        catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },


        async eventInteraction(interaction){
            if(global.isEventConfirm){
                await interaction.reply(`Event ${interaction.options.getString("eventname")} created!`)
            }
        }
    }

        

            
         




