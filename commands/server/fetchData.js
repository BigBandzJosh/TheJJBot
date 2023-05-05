const {Event} = require('../..//models/event.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Replies with data from database!'),
    async execute(interaction) {
        await interaction.reply(`Fetching data...`);
        const events = await Event.findAll({ attributes: ['name']});
        await interaction.editReply(`Found ${events.length} events!`);

    },
};