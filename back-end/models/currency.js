const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Country = require('./country')

// { id, currencyCode, countryId, conversionRate }
const Currencies = sequelize.define('Currencies', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model : Country, 
            key : 'id', 
        }
    }, 
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}
);


Currencies.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = Currencies;
