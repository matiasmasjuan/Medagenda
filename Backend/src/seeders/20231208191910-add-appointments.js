'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const appointments = [];
    const doctorsCount = 10;
    const patientsCount = 10;

    for (let i = 1; i <= 10; i++) {
      const doctorId = faker.random.number({ min: 1, max: doctorsCount });
      const patientId = faker.random.number({ min: 1, max: patientsCount });

      appointments.push({
        doctorId: doctorId,
        patientId: patientId,
        appointmentDateTime: faker.date.between('2023-01-01T08:00:00Z', '2023-01-01T18:00:00Z'),
        status: faker.random.arrayElement(['Scheduled', 'Canceled', 'Completed']),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Appointments', appointments);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
