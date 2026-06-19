const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const salesRoutes =
    require('./routes/sales');

app.use('/api/sales', salesRoutes);


const dashboardRoutes =
    require('./routes/dashboard');

app.use('/api/dashboard', dashboardRoutes);

const authRoutes =
    require('./routes/auth');

app.use(
    '/api/auth',
    authRoutes
);

module.exports = app;