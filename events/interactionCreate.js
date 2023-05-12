const { Events } = require('discord.js');
const commandUsage = require('../models/commandUsage.js');
const userProfile = require('../models/userProfile.js');
const sequelize = require('../database.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				// Update the commandUsage table
				await command.execute(interaction);
				const [usage, created] = await commandUsage.findOrCreate({
					where: {
						userId: interaction.user.id,
						commandName: interaction.commandName,
					},
					defaults: {
						usageCount: 0,
					},

				});

				if (created) {
					await commandUsage.update({
						usageCount: usage.usageCount + 1,
					}, {
						where: {
							userId: interaction.user.id,
							commandName: interaction.commandName,
						},
					});
					console.log(`Created new usage for ${interaction.commandName}`);
				} else {
					console.log(`Incremented usage for ${interaction.commandName}`);
					await commandUsage.update({
						usageCount: usage.usageCount + 1,
					}, {
						where: {
							userId: interaction.user.id,
							commandName: interaction.commandName,
						},
					});
				}
				// Update the userProfile table
				const isUserCreated = await userProfile.findOne({ // check if user has a profile
					where: {
						userId: interaction.user.id,
					},
				});
				if (isUserCreated) { // if user has a profile
					// Find their profile
					const profile = await userProfile.findAll({
						where: {
							userId: interaction.user.id,
						},
					});
					// Increment the commandUsage in userProfile table
					for (const profileCommandUsage of profile) { // loop through the profile
						await userProfile.update({ 
							commandUsage: profileCommandUsage.commandUsage + 1, // increment the commandUsage
						}, {
							where: { // where the userId is the user's id
								userId: interaction.user.id,
							},
						});
					}
				} else if (!isUserCreated) {
					return;
				}	
			} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	} else if(interaction.isButton()) {
	// respond to the button
} else if (interaction.isStringSelectMenu()) {
	// respond to the select menu
}
	},
};