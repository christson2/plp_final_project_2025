'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add new columns to profiles table
        await queryInterface.addColumn('profiles', 'phone', {
            type: Sequelize.STRING(50),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'whatsapp_link', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        // Seller-specific columns
        await queryInterface.addColumn('profiles', 'business_name', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'business_category', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'operational_hours', {
            type: Sequelize.JSON,
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'product_count', {
            type: Sequelize.INTEGER.UNSIGNED,
            defaultValue: 0,
        });

        // Service Provider-specific columns
        await queryInterface.addColumn('profiles', 'service_name', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'profession_category', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'certification', {
            type: Sequelize.STRING(1024),
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'experience_years', {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        });

        await queryInterface.addColumn('profiles', 'portfolio_count', {
            type: Sequelize.INTEGER.UNSIGNED,
            defaultValue: 0,
        });

        // Consumer-specific columns
        await queryInterface.addColumn('profiles', 'preferences', {
            type: Sequelize.JSON,
            allowNull: true,
        });

        // Statistics columns
        await queryInterface.addColumn('profiles', 'total_reviews', {
            type: Sequelize.INTEGER.UNSIGNED,
            defaultValue: 0,
        });

        await queryInterface.addColumn('profiles', 'average_rating', {
            type: Sequelize.DECIMAL(3, 2),
            defaultValue: 0,
        });

        // Profile completion tracking
        await queryInterface.addColumn('profiles', 'is_complete', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });

        await queryInterface.addColumn('profiles', 'completion_percentage', {
            type: Sequelize.INTEGER.UNSIGNED,
            defaultValue: 0,
        });

        // Add indexes for performance
        await queryInterface.addIndex('profiles', ['user_id']);
        await queryInterface.addIndex('profiles', ['profile_type']);
        await queryInterface.addIndex('profiles', ['user_id', 'profile_type']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('profiles', 'phone');
        await queryInterface.removeColumn('profiles', 'whatsapp_link');
        await queryInterface.removeColumn('profiles', 'business_name');
        await queryInterface.removeColumn('profiles', 'business_category');
        await queryInterface.removeColumn('profiles', 'operational_hours');
        await queryInterface.removeColumn('profiles', 'product_count');
        await queryInterface.removeColumn('profiles', 'service_name');
        await queryInterface.removeColumn('profiles', 'profession_category');
        await queryInterface.removeColumn('profiles', 'certification');
        await queryInterface.removeColumn('profiles', 'experience_years');
        await queryInterface.removeColumn('profiles', 'portfolio_count');
        await queryInterface.removeColumn('profiles', 'preferences');
        await queryInterface.removeColumn('profiles', 'total_reviews');
        await queryInterface.removeColumn('profiles', 'average_rating');
        await queryInterface.removeColumn('profiles', 'is_complete');
        await queryInterface.removeColumn('profiles', 'completion_percentage');
    },
};
