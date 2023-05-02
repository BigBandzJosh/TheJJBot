const { MessageEmbed } = require('discord.js');

module.exports = client => {

    client.on('guildMemberAdd', member => {
            
            const channelID = '1102572856883298307'; // Channel ID to send the message to
            console.log(member);
            const channel = member.guild.channels.cache.get(channelID);
            const message = `**Welcome to the channel <@${member.id}>! \n\nPlease read the rules and enjoy your stay!**`;

            const guild = member.guild;
           channel.send(message);


        });
}


    


        