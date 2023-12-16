'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users',
      [
        {
          email: 'fake1@gmail.com',
          name: 'fake1',
          city: 'phu tho',
        },
        {
          email: 'fake2@gmail.com',
          name: 'fake2',
          city: 'tuyen quang'
        },
        {
          email: 'fake3@gmail.com',
          name: 'fake3',
          city: 'thai binh'
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Employees', null, {});
     */
  }
};
