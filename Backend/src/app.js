const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/ranking', require('./routes/api/ranking'));

app.get('/', (_, res) => {
  res.send('Medagenda API');
});

module.exports = app;