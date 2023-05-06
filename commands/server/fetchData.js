const sequelize =require('../../database.js');
const { SlashCommandBuilder } = require('discord.js');
const {Event} = require('../../models/event.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Replies with data from database!'),
    async execute(interaction) {
        await interaction.reply(`Fetching data...`);
        
        

         
        const array = await Event.findAll({
            attributes: ['name', 'date'],
        });

        await interaction.editReply(`Event name: ${array[0].name}\nEvent date: ${array[0].date}`);
    },
};