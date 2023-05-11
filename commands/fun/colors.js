const { SlashCommandBuilder, EmbedBuilder, Guild, AttachmentBuilder } = require('discord.js');
const puppeteer = require('puppeteer')
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { channel } = require('diagnostics_channel');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Generates a color pallette'),
    async execute(interaction) {
        try{
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

        // Function to create emojis of the colors to display to the user
        async function createEmoji() {
            try {
                const canvas = createCanvas(100, 100) // Create a canvas
                const ctx = canvas.getContext('2d') // Get the 2D rendering context from the canvas object

                // Loop through the color codes array and create a picture for each color code
                let i = 0;
                colorCodesArray.forEach(colorCode => {
                    i = colorCodesArray.indexOf(colorCode) + 1;
                    ctx.fillStyle = `#${colorCode}` // Set the fill color
                    ctx.fillRect(0, 0, 100, 100) // Fill the rectangle with the color

                    fs.writeFileSync(`./color-imgs/${colorCode}.png`, canvas.toBuffer()) // Write the image to a file (image.png
                })

            } catch (error) {
                console.error(error)
            }
        }
        await createEmoji(); // Call the function to create the pictures

    
        await interaction.reply({content: ":art: Generating color pallette", ephemeral: true}) // Send a message to let the user know the bot is working

        // Loop through all the files in the color-imgs folder
        fs.readdirSync('./color-imgs').forEach(file => {
            // Skip all .gitkeep files
            if (file === '.gitkeep') return;

            const path = __dirname + `/../../color-imgs/${file}`; // Get the path to the file
            const fileName = file.split('.').slice(0, -1).join('.'); // Get the file name without the extension

            // Create a new attachment and embed
            const fileAttatch = new AttachmentBuilder(path);
            // const colorEmbed = new EmbedBuilder()
            //     .setColor(global.embedColor)
            //     .setTitle(`:art: ${fileName}`) // Set the title of the embed to the file name (the color code)
            //     .setImage(`attachment://${file}`) // Add the image to the embed


            // interaction.followUp({ embeds: [colorEmbed], files: [fileAttatch]})   // Send the embed // ADD EPHEMERAL: true TO MAKE IT ONLY VISIBLE TO THE USER WHO SENT THE COMMAND
              interaction.followUp({ files: [fileAttatch], ephemeral: true})  

            
              // Wait 1 second 
            setTimeout(() => {
                // Delete the file
                fs.unlinkSync(path);
            }
                , 1000)
                

        });
        }catch(error){
            console.log(error);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    }

};
