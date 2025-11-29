const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Allow cross-origin requests from the frontend during development
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));
// Serve uploaded media files
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// API routes
app.use('/api', routes);

app.get('/api/ping', (req, res) => res.json({ ok: true, time: Date.now() }));

// Log unmatched static asset requests (helps find broken links)
app.use((req, res, next) => {
	const staticExt = /\.(css|js|png|jpg|jpeg|svg|gif|webp|map|ico)$/i;
	if (req.method === 'GET' && staticExt.test(req.path)) {
		// If we reach here, the static asset was not served by express.static
		console.warn(`[StaticNotFound] ${req.method} ${req.originalUrl}`);
	}
	next();
});

app.use(errorHandler);

module.exports = app;
