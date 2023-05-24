const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of commands'),
    async execute(interaction) {
        try{
            const helpEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle('List of available slash commands.')
            .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
        // Loop through the commands folder and the sub folders to get all the command names and add them to the embed
        const commandFolders = fs.readdirSync(path.join(__dirname, '../')).filter(file => fs.statSync(path.join(__dirname, '../', file)).isDirectory());
        for (let folder of commandFolders) {
            const commandsPath = path.join(__dirname, '../', folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            let commandNames = [];
            for (const file of commandFiles) {
                const command = require(path.join(commandsPath, file));
                if ('data' in command && 'execute' in command) {
                    commandNames.push(command.data.name);
                } else {
                    return;
                }
            }
            // Capitalize the folder name at the first letter
            folder = folder.charAt(0).toUpperCase() + folder.slice(1);
            // Add a "/" before each command name
            commandNames = commandNames.map(commandName => `/${commandName}`);
        
            helpEmbed.addFields({name: folder, value: commandNames.join('\n'), inline: true});     
        }
        await interaction.reply({ embeds: [helpEmbed] });

        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },
};