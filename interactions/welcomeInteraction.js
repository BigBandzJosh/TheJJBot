const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function welcomeInteraction(member, client){
    const guild = client.guilds.cache.get(member.guild.id); // Get the guild the member joined
    const channel = guild.channels.cache.get(`${guild.systemChannelId}`) // Get the system channel of the guild
    // Create a new embed and send it to the system channel
    const welcomeEmbed = new EmbedBuilder()
        .setColor(global.embedColor)
        .setTitle(`:wave: Welcome ${member.user.username}!`)

    await channel.send({ embeds: [welcomeEmbed] }); // Send the embed to the system channel
}

module.exports = {
    welcomeInteraction
}