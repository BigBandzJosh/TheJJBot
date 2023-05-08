module.exports = (sequelize, DataTypes) => {
    const commandUsage = sequelize.define('CommandUsage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commandName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usageCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        // Other model options go here
    });

    module.exports = commandUsage;
}