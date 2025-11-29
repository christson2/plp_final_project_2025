'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      conversation_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: true },
      sender_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
      receiver_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
      request_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      is_read: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};
