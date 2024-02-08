const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_Name, process.env.PG_Username, process.env.PG_Password, {
    host: process.env.PG_Hostnaem,
    port: process.env.PG_Port,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true
        }
    }
});

module.exports = sequelize;   