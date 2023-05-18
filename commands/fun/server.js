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
            .setDescription(`Server info for ${interaction.guild.name}`)
            .addFields(
                { name: "Server Name", value: `${interaction.guild.name}`, inline: true },
                { name: "Server ID", value: `${interaction.guild.id}`, inline: true },
                { name: "Server Owner", value: `${interaction.guild.owner}`, inline: true },
            )
            .setTimestamp();



        await interaction.reply(`Fetching server info...`);
        await interaction.editReply({ embeds: [serverEmbed] });
    },
};
