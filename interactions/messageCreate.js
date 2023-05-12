const userProfile = require('../models/userProfile.js');
async function messageCreate(message){

    
    const userID = message.author.id; // Get the user ID of the message author
    const isUserCreated = await userProfile.findOne({ // check if user has a profile
        where: {
            userId: userID,
        },
    });
    if (isUserCreated) { // if user has a profile
        // Find their profile
        const profile = await userProfile.findAll({
            where: {
                userId: userID,
            },
        });
        for (const messageCount of profile) { // loop through the profile
            await userProfile.update({ 
                messageCount: messageCount.messageCount + 1, // increment the commandUsage
            }, {
                where: { // where the userId is the user's id
                    userId: userID,
                },
            });
        }

        

    } else if (!isUserCreated) {
        return;
    }
}

module.exports = {
    messageCreate
}