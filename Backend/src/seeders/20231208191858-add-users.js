'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');
const PASSWORD_SALT_ROUNDS = 10;
const commonPassword = '123456';
const encryptedPassword = bcrypt.hashSync(commonPassword, PASSWORD_SALT_ROUNDS);


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersArray = [];
    usersArray.push({
      name: 'Admin',
      email: 'admin@admin.com',
      password: encryptedPassword,
      role: 'Admin',
      professionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    for (let i = 1; i < 3; i++) {
      usersArray.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: encryptedPassword,
        role: 'Doctor',
        professionId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    for (let i = 0; i < 9; i++) {
      usersArray.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: encryptedPassword,
        role: 'Patient',
        professionId: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Users', usersArray);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
