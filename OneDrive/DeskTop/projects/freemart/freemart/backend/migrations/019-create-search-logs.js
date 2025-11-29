'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('search_logs', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: true },
      query_text: { type: Sequelize.STRING(500), allowNull: false },
      search_type: { type: Sequelize.STRING(50), allowNull: true },
      location: { type: Sequelize.STRING(255), allowNull: true },
      results_count: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('search_logs');
  }
};
