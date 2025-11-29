'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('profiles', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            user_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            profile_type: { type: Sequelize.ENUM('consumer', 'seller', 'provider'), allowNull: false, defaultValue: 'consumer' },
            profile_image: { type: Sequelize.STRING(1024) },
            bio: { type: Sequelize.TEXT },
            address: { type: Sequelize.STRING(500) },
            availability_status: { type: Sequelize.ENUM('available', 'busy', 'offline'), defaultValue: 'available' },
            category: { type: Sequelize.STRING(255) },
            subcategory: { type: Sequelize.STRING(255) },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('profiles');
    }
};
