const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

const Event = require('../models/event.js');

async function eventInteraction(interaction){
    
        if (interaction.customId === 'confirmEvent' && interaction.isButton()) {
            if (!interaction.replied) {
                // Send a message asking the user for the event date
                await interaction.reply({ content: "Please enter the date of the event in the format of: `DD/MM/YYYY`", ephemeral: true })
                // Create a filter to only allow the user who started the interaction to reply
                const filter = m => m.author.id === interaction.user.id;
                // Create a message collector to collect the user's response
                const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });
                // When the user replies, console log their response
                collector.on('collect', m => {
                    console.log(m.content)
                    // Parse the user inputted date to a date object
                    const date = new Date(Date.parse(m.content));
                    console.log(date)
                    // Send a message asking the user for the event reminder times
                    const reminderSelect = new StringSelectMenuBuilder()
                        .setCustomId('reminderSelect')
                        .setPlaceholder('Select a reminder time')
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel('1 Day Before')
                                .setValue('1')
                                .setDescription('Sends a reminder 1 day before the event'),
    
                            new StringSelectMenuOptionBuilder()
                                .setLabel('2 Days Before')
                                .setValue('2')
                                .setDescription('Sends a reminder 2 days before the event'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('3 Days Before')
                                .setValue('3')
                                .setDescription('Sends a reminder 3 days before the event'),
    
                        )
                    const row = new ActionRowBuilder()
                        .addComponents(reminderSelect)
    
                    interaction.followUp({ content: "Please select a reminder time", ephemeral: true, components: [row] })
    
                    // Store the user response in a variable
                    const reminderFilter = i => i.user.id === interaction.user.id;
                    // Create a message collector to collect the user's response
                    const reminderCollector = interaction.channel.createMessageComponentCollector({ reminderFilter, max: 1, time: 60000 });
                    // When the user replies, get the message and store it in a variable
                    reminderCollector.on('collect', async i => {
                        // console log the message
                        console.log(i.values[0])
    
                        i.deferUpdate();
                        // Send a message confirming the event creation
                        interaction.followUp({ content: `Succesfully created an event with a reminder ${i.values[0]} day(s) before the event.`, ephemeral: true });
    
                        // Create the event using node-schedule
                        const schedule = require('node-schedule');
    
    
                        // Switch statement to determine the reminder time
                        let reminderDate;
                        switch (i.values[0]) {
                            case '1':
                                // Create a new date object for the reminder time
                                reminderDate = new Date(date.getTime() - 86400000);
                                break;
                            case '2':
                                // Create a new date object for the reminder time
                                reminderDate = new Date(date.getTime() - 172800000);
                                break;
                            case '3':
                                // Create a new date object for the reminder time
                                reminderDate = new Date(date.getTime() - 259200000);
                                break;
                        }
                        const testDate = '2023-05-03T12:10:00.000Z'
                        const testReminder = '2023-05-03T12:15:00.000Z'
                        const eventJob = schedule.scheduleJob(date, function () {
                            console.log('Event is happening today')
                        })
                        const reminderJob = schedule.scheduleJob(reminderDate, function () {
                            console.log('Reminder sent')
                        })

                        // Create a new event object
                        const event = Event.create({
                            name: interaction.options.getString('name'),
                            date: date,
                            reminder: reminderDate,
                            username: interaction.user.username,
                            usage_count: 1,
                        }
                        
                        // Add the event to the database
                        )
                        console.log(event)
                    })
                })
            }
        } else if (interaction.customId === 'cancelEvent') {
            await interaction.reply({ content: "Event was not created.", ephemeral: true })
        }
    }


module.exports = {
    eventInteraction
};

