'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('videos', {
            id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
            owner_id: { type: Sequelize.BIGINT.UNSIGNED, allowNull: false },
            file_path: { type: Sequelize.STRING(1024), allowNull: false },
            caption: { type: Sequelize.STRING(1024) },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('videos');
    }
};
