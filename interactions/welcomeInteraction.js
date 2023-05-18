const {EmbedBuilder} = require('discord.js');

async function welcomeInteraction(member, client){
    const guild = client.guilds.cache.get(member.guild.id); // Get the guild the member joined
    const channel = guild.channels.cache.get(`${guild.systemChannelId}`) // Get the system channel of the guild
    // Create a new embed and send it to the system channel
    const welcomeEmbed = new EmbedBuilder()
        .setColor(global.embedColor)
        .setTitle(`:wave: Welcome ${member.user.username}!`)
        .setDescription(`Welcome to ${guild.name}!`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .addFields(
            { name: "Member Count", value: `${guild.memberCount}`, inline: true },
            { name: "Member Joined", value: `${member.joinedAt}`, inline: true },
            { name: "Account Created", value: `${member.user.createdAt}`, inline: true },
        )

    await channel.send({ embeds: [welcomeEmbed] }); // Send the embed to the system channel
}

module.exports = {
    welcomeInteraction
}