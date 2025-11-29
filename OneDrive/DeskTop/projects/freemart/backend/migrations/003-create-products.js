'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            title: { type: Sequelize.STRING(255), allowNull: false },
            images: { type: Sequelize.JSON },
            description: { type: Sequelize.TEXT },
            category: { type: Sequelize.STRING(255) },
            price: { type: Sequelize.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
            seller_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            stock: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
            latitude: { type: Sequelize.DECIMAL(10, 7) },
            longitude: { type: Sequelize.DECIMAL(10, 7) },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};
