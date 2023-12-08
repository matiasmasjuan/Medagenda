'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _) {
    const professionsArray =  [
      {
        name: 'Kinesiología',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Geriatría',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Traumatología',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Professions', professionsArray);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Professions', null, {});
  }
};
