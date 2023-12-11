'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const appointments = [];
    appointments.push({
      scheduleId: 1,
      patientId: 1,
      status: faker.random.arrayElement(['Scheduled', 'Canceled', 'Completed']),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert('Appointments', appointments);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
