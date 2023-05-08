module.exports = (sequelize, DataTypes) => {
    const userProfile = sequelize.define('UserProfile', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        commandUsage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,

        },
        messageCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        // Other model options go here
    });
    module.exports = userProfile;

}