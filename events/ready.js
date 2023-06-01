const { Events, EmbedBuilder } = require('discord.js');
const Event = require('../models/event.js');
const schedule = require('node-schedule');
const CircularJSON = require('circular-json');

module.exports = {
    name: Events.ClientReady,
    once: true,

    // This event executes when the bot is ready.
    execute(client) {

        console.log(`Ready! Logged in as ${client.user.tag}`);

        let eventName;
        let eventDate;
        let eventReminder;
        let channelID;
        let channel;
        // Find all events in the database
        Event.findAll().then(events => {
            // Loop through each event
            events.forEach(event => {
                // Get the event name
                eventName = event.name;
                // Get the event date
                eventDate = new Date(event.date);
                // Get the event reminder
                eventReminder = event.reminder;
                // Get the channel ID
                channelID = event.channelID;
                // Get the channel
                channel = client.channels.cache.get(channelID);
                console.log(channelID)
            })
        })





        // If the event is in the past, delete it from the database
        if (eventDate < Date(Date.now())) {
            // Delete the event from the database
            Event.destroy({
                where: {
                    name: eventName
                }
            })
            console.log(`Deleted ${eventName} from the database.`)
        } else {
            // Create the event using node-schedule
            const eventJob = schedule.scheduleJob(eventDate, function () {
                const embed = new EmbedBuilder()
                    .setColor(global.embedColor)
                    .setTitle(`:tada: ${eventName} is today!`)
                    .addFields({
                        name: 'Ping',
                        value: `${eventDate.toDateString()} @everyone`,
                        inline: true
                    })
                channel.send({ embeds: [embed] })
            })
            console.log(`Recreated ${global.eventTitleName} in the database.`)
            const reminderJob = schedule.scheduleJob(eventReminder, function () {
                const embed = new EmbedBuilder()
                    .setColor(global.embedColor)
                    .setTitle(`:tada: ${eventName} is in ${eventReminder} day(s)!`)
                    .addFields({
                        name: 'Ping',
                        value: `${eventDate.toDateString()} @everyone`,
                        inline: true
                    })
                channel.send({ embeds: [embed] })
            })
            console.log(`Recreated ${eventName} Reminder in the database.`)

        }
    }
}


