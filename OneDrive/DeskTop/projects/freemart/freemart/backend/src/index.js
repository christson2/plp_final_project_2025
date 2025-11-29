const express = require('express');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./models');
const app = require('./app');
const child = require('child_process');

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Database connection OK');

        if (process.env.RUN_MIGRATIONS === 'true') {
            console.log('RUN_MIGRATIONS=true — running sequelize migrations...');
            // run migrations via npx sequelize db:migrate
            child.execSync('npx sequelize db:migrate', { stdio: 'inherit' });
        }

        app.listen(PORT, () => {
            console.log(`FreeMart backend listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
}

if (require.main === module) start();

module.exports = { start, app };
