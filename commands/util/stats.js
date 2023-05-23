const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const userProfile = require('../../models/userProfile.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Displays your message & commanmd statistics'),
    async execute(interaction) {
        try{
            // Get userId & check if user has a profile
            const userId = interaction.user.id;
            //findOrCreate acts as a check to see if the user has a profile
            const isUserCreated = await userProfile.findOrCreate({
                where: {
                    userId: userId,
                },
            });
            if(isUserCreated){ // if user has a profile
                console.log("User has a profile");
                // do something
                const user = await userProfile.findOne({
                    where: {
                        userId: userId,
                    },
                });
                // Data variables
                const commandUsage = user.dataValues.commandUsage.toString();
                const messageCount = user.dataValues.messageCount.toString();
                const profileEmbed = new EmbedBuilder()
                    .setColor(global.embedColor)
                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
                    .addFields(
                        {name: ":abacus: Command Usage", value: `${commandUsage}`},
                        {name: ":speech_balloon: Message Count", value: `${messageCount}`},
                    )
                    .setTimestamp();

                    await interaction.reply({embeds: [profileEmbed]});
            } else if(!isUserCreated){ // if user does not have a profile
                // create a profile
                console.log("User does not have a profile");
                await userProfile.create({
                    userId: userId,
                    commandUsage: 0,
                    messageCount: 0,
                });
            }
        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    },
};