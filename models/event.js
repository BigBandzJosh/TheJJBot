const {DataTypes} = require('sequelize');
const sequelize = require('../database.js');

const Event = sequelize.define('Event', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reminder: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usage_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    // Other model options go here
});

module.exports = Event;