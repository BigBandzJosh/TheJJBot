module.exports = (sequelize, DataTypes) => {
    const weatherCollection = sequelize.define('WeatherCollection', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        temperature: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        feelsLike: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        humidity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        windSpeed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        windDirection: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        windGust: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precipitation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visibility: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uvIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        // Other model options go here
    });

    module.exports = weatherCollection;
}