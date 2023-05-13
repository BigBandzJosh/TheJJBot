const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        //reply with something a little more interesting than just "Pong!"

        const pingEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`Pong!`)
            .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')

            .setDescription(`User: ${interaction.user.username}\n\nLatency is ${Date.now() - interaction.createdTimestamp}ms.\n\n API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
            .setTimestamp();

        await interaction.reply({ embeds: [pingEmbed] });
    },
};