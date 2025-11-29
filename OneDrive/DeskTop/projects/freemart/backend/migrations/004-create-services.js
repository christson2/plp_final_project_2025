'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('services', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            name: { type: Sequelize.STRING(255), allowNull: false },
            description: { type: Sequelize.TEXT },
            provider_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            pricing_info: { type: Sequelize.JSON },
            skill_category: { type: Sequelize.STRING(255) },
            latitude: { type: Sequelize.DECIMAL(10, 7) },
            longitude: { type: Sequelize.DECIMAL(10, 7) },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('services');
    }
};
