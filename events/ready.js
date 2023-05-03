const { Events } = require('discord.js');



module.exports = {
    name: Events.ClientReady,
    once: true,

    // This event executes when the bot is ready.
    execute(client) {
        // Syncs the database
        console.log(`Ready! Logged in as ${client.user.tag}`);
        
        
        
    }, 

};