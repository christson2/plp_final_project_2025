'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bids', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            request_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            provider_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            amount: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
            delivery_time_days: { type: Sequelize.INTEGER.UNSIGNED },
            message: { type: Sequelize.TEXT },
            attachments: { type: Sequelize.JSON },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bids');
    }
};
