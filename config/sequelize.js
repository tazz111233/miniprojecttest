const { Sequelize } = require('sequelize');

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

//connected through URL
const sequelize = new Sequelize(process.env.PG_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }})
module.exports = sequelize;   