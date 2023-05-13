const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {

        const userEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`User Info`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Your unique Discord ID: ${interaction.user.id}\n\nYour username: ${interaction.user.username}\n\nYour avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setTimestamp();



        await interaction.reply({ embeds: [userEmbed] });
    },
};