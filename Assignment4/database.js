const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('my_database', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: true,
});

module.exports = sequelize;
