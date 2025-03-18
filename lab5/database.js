const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'my_username', 'my_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;