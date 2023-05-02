const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Get the weather for a location.")
        .addStringOption(option =>
            option.setName("location")
                .setDescription("The location to get the weather for.")
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const location = interaction.options.getString("location");

        const weather = {};

        weather.temperature = {
            unit: "celsius"
        }

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WeatherAPI}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        weather.temperature.value = Math.floor(data.main.temp);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;



        await interaction.editReply(`:thermometer: The weather for ${location} is ${weather.temperature.value} degrees Celsius.`);
    },
};
