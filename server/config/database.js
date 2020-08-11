const Sequelize = require('sequelize');
module.exports = new Sequelize('dbback', 'root', 'naira123', 
{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acqurie: 30000,
        idle: 10000
    }
    //operatorsAliases: false
});