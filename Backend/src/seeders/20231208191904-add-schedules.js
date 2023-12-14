'use strict';

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

    for (let i = 2; i <= 3; i++) {
      for (let j = 1; j <= 5; j++) {
        doctorSchedules.push({
          doctorId: i,
          date: getRandomDate(),
          moduleId: j,
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
