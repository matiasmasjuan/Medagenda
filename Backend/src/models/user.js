'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const PASSWORD_SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profession, {foreignKey: 'professionId', constraints: false});
      this.hasMany(models.Schedule, {as: 'schedules', foreignKey: 'doctorId'});
      this.hasMany(models.Appointment, {as: 'appointments', foreignKey: 'userId'});
    }
  }
  User.init({
    role:  DataTypes.ENUM('Admin', 'Doctor', 'Patient'),
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    professionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });
  return User;
};