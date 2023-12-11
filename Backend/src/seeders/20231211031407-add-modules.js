'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _) {
    const modulesArray =  []
    for (let i = 8; i < 13; i++) {
      modulesArray.push({
        startHour: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Modules', modulesArray);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
