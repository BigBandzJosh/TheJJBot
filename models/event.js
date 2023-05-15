// This is the model for the Event table in the database. It defines the table's columns and their data types.

//equivalent to a table in the database
//CREATE TABLE Events (
//id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//    name VARCHAR(255) NOT NULL,
//    date DATE NOT NULL,
//    reminder INT NOT NULL,
//    username VARCHAR(255) NOT NULL,
//    usage_count INT NOT NULL
//);

//Need to consider the relationships with this type of database... didn't think about it till I was writing this comment.

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reminder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        channelID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        // Other model options go here
    });

   module.exports = Event;
};