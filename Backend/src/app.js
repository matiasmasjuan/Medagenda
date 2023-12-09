const express = require('express');
const app = express();
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');
const appointmentRoutes = require('./routes/appointment');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (_, res) => {
  res.send('Medagenda API');
});

module.exports = app;