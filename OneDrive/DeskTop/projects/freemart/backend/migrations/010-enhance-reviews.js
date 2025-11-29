'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add new columns to reviews table
        await queryInterface.addColumn('reviews', 'appointment_id', {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
        });

        await queryInterface.addColumn('reviews', 'review_type', {
            type: Sequelize.ENUM('service', 'appointment', 'product', 'general'),
            defaultValue: 'general',
        });

        // Add validation constraint to rating
        await queryInterface.changeColumn('reviews', 'rating', {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('reviews', 'appointment_id');
        await queryInterface.removeColumn('reviews', 'review_type');
    },
};
