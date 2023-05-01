const {REST, Routes} = require('discord.js');
const {config} = require('dotenv');
config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const filePath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(filePath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(filePath, file));
        commands.push(command.data.toJSON());
    }
}

const rest = new REST().setToken(process.env.DiscordAPI);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(process.env.ClientID),
            {body: commands},
        );

        console.log(`Successfully reloaded ${commands.length} application (/) commands.}`);
    } catch (error) {
        console.error(error);
    }
})();
