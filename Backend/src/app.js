const express = require('express');
const cors = require('cors');
const app = express();
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');
const appointmentRoutes = require('./routes/appointment');
const professionRoutes = require('./routes/profession');
const modulesRoutes = require('./routes/modules');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/professions', professionRoutes);
app.use('/api/modules', modulesRoutes);

app.get('/', (_, res) => {
  res.send('Medagenda API');
});

module.exports = app;