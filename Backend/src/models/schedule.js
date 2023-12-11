'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Appointment, {foreignKey: 'scheduleId'});
      this.belongsTo(models.Module, {foreignKey: 'moduleId'});
      this.belongsTo(models.User, {foreignKey: 'doctorId'});
    }
  }
  Schedule.init({
    doctorId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    moduleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};