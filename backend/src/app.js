const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        status: "OK",
        message: "API Running"
    });
});


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