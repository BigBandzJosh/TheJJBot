const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const Event = require('../models/event.js');
const event = require('../commands/util/event.js');
const client = require('../index.js');



async function eventInteraction(interaction) {

    if (interaction.customId === 'confirmEvent' && interaction.isButton()) {
        if (!interaction.replied) {
            // Send a message asking the user for the event date
            await interaction.reply({ content: "Please enter the date of the event in the format of: `YYYY/MM/DD`", ephemeral: true })
            // Create a filter to only allow the user who started the interaction to reply
            const filter = m => m.author.id === interaction.user.id;
            // Create a message collector to collect the user's response
            const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });
            // When the user replies, console log their response
            collector.on('collect', m => {
                console.log(m.content)
                // Regex to make sure the users date is in the format of YYYY/MM/DD
                const dateRegex = new RegExp('^[0-9]{4}/[0-9]{2}/[0-9]{2}$');
                // If the user's response does not match the regex, send a message telling them to try again
                if (!dateRegex.test(m.content)) {
                    interaction.followUp({ content: "Invalid Date Format", ephemeral: true })
                    return;
                }
                // Replace "/" with "-" to make the date object work & parse the date
                const date = new Date(Date.parse(m.content.replace(/\//g, '-')));


                console.log(date)

                // Get the channel id of the channel the interaction was started in in the form of a discord.js channel object
                const channel = interaction.channel;
                
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
                    var reminderDate;
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

                    // I dont think we need this anymore. People probably wont be creating events that are during the same day but we can keep it just incase
                    const eventJob = schedule.scheduleJob(date, function () {
                        const embed = new EmbedBuilder()
                            .setColor(global.embedColor)
                            .setTitle(`:tada: ${global.eventTitleName} is today!`)
                            .addFields({
                                name: 'Ping',
                                value: `${date.toDateString()} @everyone`,
                                inline: true
                            })
                        channel.send({ embeds: [embed] })
                    })
                    const reminderJob = schedule.scheduleJob(reminderDate, function () {
                        const embed = new EmbedBuilder()
                            .setColor(global.embedColor)
                            .setTitle(`:tada: ${global.eventTitleName} is in ${i.values[0]} day(s)!`)
                            .addFields({
                                name: 'Ping',
                                value: `${date.toDateString()} @everyone`,
                                inline: true
                            })
                        channel.send({ embeds: [embed] })
                    })

                    const channel = interaction.channel;
                    console.log(`Channel ID: ${channel.id} || Guild ID: ${channel.guild.id}`)
                    let channelID = channel.id;
                    

                    // add to the database
                    // equivalent to: INSERT INTO tags (name, date, reminder, username,usage_count) values (?, ?, ?,?,?) in SQL;
                    await Event.create({
                        name: global.eventTitleName,
                        date: date,
                        reminder: reminderDate,
                        username: interaction.user.username,
                        channelID: channelID,

                    }).then(() => {
                        //pull the created at and updated at times from the database
                        Event.findOne({
                            where: {
                                name: global.eventTitleName,
                                date: date,
                                reminder: reminderDate, 
                                username: interaction.user.username,
                                channelID: channelID,
                            },
                        }).then(event => {
                            console.log('Created event', event.dataValues.createdAt, event.dataValues.updatedAt)
                        }
                        ).catch(err => {
                            console.log('Error creating an event', err)
                        })
                    })
                })
            })
        } else if (interaction.customId === 'cancelEvent') {
            await interaction.reply({ content: "Event was not created.", ephemeral: true })
        }
    }

}
    module.exports = {
        eventInteraction
    };

