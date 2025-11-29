'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add new columns to users table
        await queryInterface.addColumn('users', 'email', {
            type: Sequelize.STRING(255),
            allowNull: true
        });

        await queryInterface.addColumn('users', 'profile_picture', {
            type: Sequelize.STRING(1024),
            allowNull: true,
        });

        await queryInterface.addColumn('users', 'current_profile_mode', {
            type: Sequelize.ENUM('consumer', 'seller', 'provider'),
            defaultValue: 'consumer',
        });

        await queryInterface.addColumn('users', 'consumer_profile_active', {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        });

        await queryInterface.addColumn('users', 'seller_profile_active', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });

        await queryInterface.addColumn('users', 'provider_profile_active', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });

        await queryInterface.addColumn('users', 'notification_settings', {
            type: Sequelize.JSON,
            defaultValue: JSON.stringify({
                email_notifications: true,
                sms_notifications: true,
                push_notifications: true,
            }),
        });

        // Drop old account_type column if it exists
        try {
            await queryInterface.removeColumn('users', 'account_type');
        } catch (err) {
            // Column might not exist, ignore
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'email');
        await queryInterface.removeColumn('users', 'profile_picture');
        await queryInterface.removeColumn('users', 'current_profile_mode');
        await queryInterface.removeColumn('users', 'consumer_profile_active');
        await queryInterface.removeColumn('users', 'seller_profile_active');
        await queryInterface.removeColumn('users', 'provider_profile_active');
        await queryInterface.removeColumn('users', 'notification_settings');
    },
};
