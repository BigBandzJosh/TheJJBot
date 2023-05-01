const {REST, Routes} = require('discord.js');
const {config} = require('dotenv');
config();
const fs = require('node:fs');
const path = require('node:path');

//creates an array of all the commands
const commands = [];
//creates a path to the commands folder
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loops over each folder in the commands folder
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Loops over each file in the commands folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
    // Sets a new item in the Collection
        if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
}
//creates a new rest client
const rest = new REST().setToken(process.env.DiscordAPI);

//tries to refresh the commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            //if we wanted to add commands to only one Guild we would use Routes.applicationGuildCommands(process.env.ClientID, process.env.GuildID)
            Routes.applicationCommands(process.env.ClientID),
            {body: commands},
        );

        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();