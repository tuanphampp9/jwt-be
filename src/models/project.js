'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projects.belongsToMany(models.Users, { through: 'project_User' })
    }
  }
  projects.init({
    name: DataTypes.STRING,
    startDate: DataTypes.STRING,
    description: DataTypes.STRING,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};