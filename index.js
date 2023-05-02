//Discord bot by: Jaegar and Josh
const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
// Global colour variable
global.embedColor = '#fa2f6c'
//fs or file system to read files
const fs = require('node:fs');
const path = require('node:path');
//dotenv to store enviroment variables
const { config } = require('dotenv')
config();

// Creates a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


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


// Event command interaction listener

client.on(Events.InteractionCreate, async interaction => {
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
            })

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

            await interaction.followUp({ content: "Please select a reminder time", ephemeral: true, components: [row] })

            // Store the user response in a variable
            const reminderFilter = i => i.user.id === interaction.user.id;
            // Create a message collector to collect the user's response
            const reminderCollector = interaction.channel.createMessageComponentCollector({ reminderFilter, max: 1, time: 60000 });
            // When the user replies, get the message and store it in a variable
            reminderCollector.on('collect', async i => {
                // console log the message
                console.log(i.values[0])

                await i.deferUpdate();

                await interaction.followUp({ content: `Event created with reminder ${i.values[0]} day(s) before the event.`, ephemeral: true });
            })

        }

    } else if (interaction.customId === 'cancelEvent') {
        await interaction.reply({ content: "Event was not created.", ephemeral: true })
    }
})
// Member Joining event listener
client.on('guildMemberAdd', async member => {

    const guild = client.guilds.cache.get(member.guild.id); // Get the guild the member joined
    const channel = guild.channels.cache.get(`${guild.systemChannelId}`) // Get the system channel of the guild
    // Create a new embed and send it to the system channel
    const welcomeEmbed = new EmbedBuilder()
        .setColor(global.embedColor)
        .setTitle(`:wave: Welcome ${member.user.username}!`)

    await channel.send({ embeds: [welcomeEmbed] }); // Send the embed to the system channel
})





// Login to Discord with your client's token
client.login(process.env.DiscordAPI);
