const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {

        const serverEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`Server Info`)
            .setAuthor({ name: 'TheJJBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(`Server name: ${interaction.guild.name}\n\nTotal members: ${interaction.guild.memberCount}\n\nServer created: ${interaction.guild.createdAt}\n\nServer icon: ${interaction.guild.iconURL({ dynamic: true })}`)
            .setTimestamp();



        await interaction.reply(`Fetching server info...`);
        await interaction.editReply({ embeds: [serverEmbed] });
    },
};
