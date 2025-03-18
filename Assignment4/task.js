const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Import the connection

const Task = sequelize.define(
  'Task',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
  }
);

module.exports = Task;
