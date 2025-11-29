'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('requests', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            title: { type: Sequelize.STRING(255), allowNull: false },
            description: { type: Sequelize.TEXT },
            media: { type: Sequelize.JSON },
            ai_summary: { type: Sequelize.TEXT },
            category: { type: Sequelize.STRING(255) },
            user_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            status: { type: Sequelize.ENUM('open', 'closed', 'cancelled'), defaultValue: 'open' },
            latitude: { type: Sequelize.DECIMAL(10, 7) },
            longitude: { type: Sequelize.DECIMAL(10, 7) },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('requests');
    }
};
