'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const doctorSchedules = [];

    const getRandomDate = () => {
      const currentDate = new Date();
      const randomDays = Math.floor(Math.random() * 4);
      const randomDate = new Date(currentDate);
      randomDate.setDate(currentDate.getDate() + randomDays);
      return randomDate;
    }

    for (let i = 1; i <= 10; i++) {
      doctorSchedules.push({
        doctorId: i,
        date: getRandomDate(),
        moduleId: faker.random.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Schedules', doctorSchedules);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
