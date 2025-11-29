'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: false },
      company_name: { type: Sequelize.STRING(255), allowNull: true },
      job_type: { type: Sequelize.STRING(50), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      salary_range: { type: Sequelize.STRING(100), allowNull: true },
      location: { type: Sequelize.STRING(255), allowNull: true },
      contact_phone: { type: Sequelize.STRING(50), allowNull: true },
      contact_whatsapp: { type: Sequelize.STRING(50), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};
