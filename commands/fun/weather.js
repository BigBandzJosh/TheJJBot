const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Get the weather for a location.")
        .addStringOption(option =>
            option.setName("location")
                .setDescription("The location to get the weather for.")
                .setRequired(true)),
    async execute(interaction) {
        try{
            await interaction.deferReply();
        const location = interaction.options.getString("location");

        const weather = {};

        

        //const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WeatherAPI}&units=metric`;
        //const url = `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${process.env.WeatherAPI}&units=metric`;

        const url = ` http://api.weatherapi.com/v1/forecast.json?key=${process.env.WeatherAPI}&q=${location}&aqi=yes&alerts=no`

        const response = await fetch(url);
        const data = await response.json();

        weather.temperature = {
            value: data.current.temp_c,
            unit: "celsius"
        }
        weather.lat = data.location.lat;
        weather.lon = data.location.lon;
        weather.feelslike = data.current.feelslike_c;
        weather.humidity = data.current.humidity;
        weather.wind = data.current.wind_kph;
        weather.winddir = data.current.wind_dir;
        weather.pressure = data.current.pressure_in;
        weather.precip = data.current.precip_mm;
        weather.cloud = data.current.cloud;
        weather.uv = data.current.uv;
        weather.visibility = data.current.vis_km;
        weather.gust = data.current.gust_kph;
        weather.icon = data.current.condition.icon;
        weather.description = data.current.condition.text;
        weather.city = data.location.name;
        weather.country = data.location.country;
        weather.currentTime = data.current.last_updated;

        const weatherEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`Weather for ${weather.city}, ${weather.country}`)
            .setDescription(`**${weather.description}** | As of: ${weather.currentTime}`)
            .setThumbnail(`https:${weather.icon}`)
            .addFields(
                { name: "Temperature", value: `${weather.temperature.value}°C`, inline: true },
                { name: "Feels Like", value: `${weather.feelslike}°C`, inline: true },
                { name: "Humidity", value: `${weather.humidity}%`, inline: true },
                { name: "Wind", value: `${weather.wind}kph ${weather.winddir}`, inline: true },
                { name: "Gust", value: `${weather.gust}kph`, inline: true },
                { name: "Pressure", value: `${weather.pressure}in`, inline: true },
                { name: "Precipitation", value: `${weather.precip}mm`, inline: true },
                { name: "Cloud Cover", value: `${weather.cloud}%`, inline: true },
                { name: "UV Index", value: `${weather.uv}`, inline: true },
                { name: "Visibility", value: `${weather.visibility}km`, inline: true },
                { name: "Latitude", value: `${weather.lat}`, inline: true },
                { name: "Longitude", value: `${weather.lon}`, inline: true },
            )
            .setTimestamp()

            /*  const airQualityEmbed = new EmbedBuilder()
            .setColor(global.embedColor)
            .setTitle(`Air Quality for ${weather.city}, ${weather.country}`)
            .setDescription(`**Air Quality**`)
            .setThumbnail(`https:${weather.icon}`)
            .addFields(
                { name: "CO", value: `${data.current.air_quality.co}µg/m³`, inline: true },
                { name: "NO2", value: `${data.current.air_quality.no2}µg/m³`, inline: true },
                { name: "O3", value: `${data.current.air_quality.o3}µg/m³`, inline: true },
                { name: "SO2", value: `${data.current.air_quality.so2}µg/m³`, inline: true },
                { name: "PM2.5", value: `${data.current.air_quality.pm2_5}µg/m³`, inline: true },
                { name: "PM10", value: `${data.current.air_quality.pm10}µg/m³`, inline: true },
            )
            .setTimestamp()
            */
        await interaction.editReply({ embeds: [weatherEmbed] });
        }catch(error){
            console.log(error);
            await interaction.editReply({content: "Please enter a valid location", ephemeral: true});
        }
    },
};
