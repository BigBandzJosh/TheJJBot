//Discord bot by: Jaegar and Josh
// Global colour variable
global.embedColor = '#fa2f6c'
//fs or file system to read files
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
//dotenv to store enviroment variables
const { config } = require('dotenv')
config();

// Creates a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const welcome = require('./events/welcome.js');

//Creates a new collection for commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Registers all of the commands from the "commands" folder.
for (const folder of commandFolders) {

    // This code loads all the command files in the commands folder
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Loops over each file in the commands folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Sets a new item in the Collection
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            //Console logs the command name and file path
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// This code loads all the event files in the events folder
// and executes them when the corresponding event is emitted.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
// Loops over each file in the events folder
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


// Interaction Receiving

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isModalSubmit()) return;

    if(interaction.customId == 'event') {
        await interaction.reply({content: 'Your Event Has Been Created!', ephemeral: true})
    }

    const eventName = interaction.fields.getTextInputValue('eventName');
    const eventDesc = interaction.fields.getTextInputValue('eventDesc');

    console.log(eventName, eventDesc);
})

// client.on(Events.InteractionCreate, async interaction => {
//     welcome(interaction);
// })




// Login to Discord with your client's token
client.login(process.env.DiscordAPI);
