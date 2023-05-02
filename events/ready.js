const {Events} = require('discord.js');
const welcome = require('./welcome.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    // This event executes when the bot is ready.
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        // welcome(client);
    },
};