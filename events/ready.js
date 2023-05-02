const { Events } = require('discord.js');
const welcome = require('./welcome.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    // This event executes when the bot is ready.
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const guild = client.guilds.cache.get(config.guildID);
        const channel = guild.channels.cache.get(config.welcomeChannelID);
        console.log(`Welcome messages will be sent to ${channel.name}`);
    },

};