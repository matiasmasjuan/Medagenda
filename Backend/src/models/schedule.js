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
      this.belongsTo(models.User, {foreignKey: 'doctorId'});
    }
  }
  Schedule.init({
    doctorId: DataTypes.INTEGER,
    dayOfWeek: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};