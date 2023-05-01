const {Events} = require('discord.js');

module.exports = {
    
    name: Events.InteractionCreate,
    
    // This event executes when a slash command is used.
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        // If the command doesn't exist, do nothing
        if (!command) {
        console.error(`no command found for ${interaction.commandName}`);
        return;
    }


    //tries to execute the command, if it fails, it will send an error message
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
},
};