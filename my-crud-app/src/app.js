import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/configdb';
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// View engine
configViewEngine(app);

// Connect to database
connectDB();

// Routes
initWebRoutes(app);

module.exports = app;