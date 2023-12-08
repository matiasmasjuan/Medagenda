const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);

app.get('/', (_, res) => {
  res.send('Medagenda API');
});

module.exports = app;