'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: { type: Sequelize.STRING(255), allowNull: false },
            phone: { type: Sequelize.STRING(50), allowNull: false, unique: true },
            password_hash: { type: Sequelize.STRING(255) },
            address: { type: Sequelize.STRING(500) },
            latitude: { type: Sequelize.DECIMAL(10, 7), allowNull: true },
            longitude: { type: Sequelize.DECIMAL(10, 7), allowNull: true },
            account_type: { type: Sequelize.ENUM('consumer', 'seller', 'provider'), defaultValue: 'consumer' },
            is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
