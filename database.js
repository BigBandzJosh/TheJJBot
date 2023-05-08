const Sequelize = require('sequelize');

//connect to the database
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

//sync the database
  sequelize.sync();

//test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
})();


//export the models, so we can use them in our code

module.exports ={ Event: require('./models/event.js')(sequelize, Sequelize.DataTypes)};
module.exports ={ CommandUsage: require('./models/commandUsage.js')(sequelize, Sequelize.DataTypes)};

module.exports = {sequelize: sequelize};







