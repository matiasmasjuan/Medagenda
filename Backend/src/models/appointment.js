'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Schedule, {foreignKey: 'scheduleId'})
      this.belongsTo(models.User, {foreignKey: 'patientId'})
    }
  }
  Appointment.init({
    scheduleId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};