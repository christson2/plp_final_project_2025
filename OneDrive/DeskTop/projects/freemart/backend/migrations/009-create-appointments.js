'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('appointments', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            service_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: true,
            },
            request_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: true,
            },
            consumer_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
            },
            provider_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
            },
            scheduled_time: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            duration_minutes: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 60,
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'),
                defaultValue: 'pending',
            },
            location: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            cancellation_reason: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('appointments');
    },
};
