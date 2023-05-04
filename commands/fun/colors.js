const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const puppeteer = require('puppeteer')

// Url to scrape
const url = 'https://coolors.co/palettes/trending';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Generates a color pallette'),
    async execute(interaction) {
        // Function to get color codes
        async function getColorCodes() {
            try {
                const browser = await puppeteer.launch({ // Launch new instance of headless chrome
                    headless: "new", // Use "headless: 'new'" instead of "headless: true" to open a new browser window each time
                });
                const page = await browser.newPage(); // Create new page
                await page.goto('https://coolors.co/generate'); // Go to URL
                await page.waitForNavigation();  // Wait for the URL to update with the color codes
                const url = await page.url(); // Grab the new URL
                const colorCodes = url.match(/\/([^/]+)$/)[1].replace(/-/g, ' '); // Trim the URL to just the color codes
                await browser.close(); // Close the browser
                return colorCodes; // Return the color codes

            }
            catch (error) {
                console.error(error);
            }
        }
        const colorCodes = await getColorCodes(); // Call the funtion to get the color codes & store them in a variable
        const colorCodesArray = colorCodes.split(' '); // Split the color codes into an array
        
        // Create a new embed
        const colorEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`:art: Color Pallette`)
        
        // Loop through the color codes array and add a field for each color code
        let i = 0;
        colorCodesArray.forEach(colorCode => {
            i = colorCodesArray.indexOf(colorCode) + 1;
            // colorEmbed.addFields(`#${colorCode}`, '\u200B', true);
            colorEmbed.addFields({ name: `Color #${i}`, value: `#${colorCode} \n`})
        });

        await interaction.reply({ embeds: [colorEmbed] }); // Send the embed




    }

};
