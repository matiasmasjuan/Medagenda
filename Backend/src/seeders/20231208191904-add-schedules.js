'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const doctorSchedules = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    for (let i = 1; i <= 10; i++) {
      for (const dayOfWeek of daysOfWeek) {
        doctorSchedules.push({
          doctorId: i,
          dayOfWeek: dayOfWeek,
          startTime: faker.date.between('2023-01-01T08:00:00Z', '2023-01-01T12:00:00Z'),
          endTime: faker.date.between('2023-01-01T14:00:00Z', '2023-01-01T18:00:00Z'),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Schedules', doctorSchedules);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
