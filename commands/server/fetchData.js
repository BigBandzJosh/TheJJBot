const {Tags} = require('../../database.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Replies with data from database!'),
    async execute(interaction) {
        await interaction.reply(`Tags: ${Tags.get('name')}
        Date: ${Tags.get('date')}
        Reminder: ${Tags.get('reminder')}
        Username: ${Tags.get('username')}
        Usage Count: ${Tags.get('usage_count')}
        `);
    },
};