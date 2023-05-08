const sequelize =require('../../database.js');
const { SlashCommandBuilder } = require('discord.js');
const commandUsage = require('../../models/commandUsage.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('Replies with data from database!'),
    async execute(interaction) {
        await interaction.reply(`Fetching data...`);
        //console log all commands used by the user
        
        const commandUsages = await commandUsage.findAll({
            where: {
                userId: interaction.user.id,
            },
        });
        for (const commandUsage of commandUsages) {
            console.log(commandUsage.dataValues);
        }
        
        
       
         
        
    },
};