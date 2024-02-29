const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Sequelize } = require('sequelize');
const pg = require('pg');
// const sequelize = new Sequelize(process.env.PG_Name, process.env.PG_Username, process.env.PG_Password, {
//     host: process.env.PG_Hostname,
//     port: process.env.PG_Port,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: true
//         }
//     }
// }); 

// connected through URL
const sequelize = new Sequelize(process.env.PG_URL, {
        dialectModule: pg, 
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }})
// Test the connection
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;   