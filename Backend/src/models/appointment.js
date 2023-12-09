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
      this.belongsTo(models.User, {as: 'doctor', foreignKey: 'doctorId'});
      this.belongsTo(models.User, {as: 'patient', foreignKey: 'patientId'})
    }
  }
  Appointment.init({
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    appointmentDateTime: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};