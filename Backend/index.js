const app = require('./src/app');
const db = require('./src/models');
const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion exitosa a la base de datos.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('No fue posible conectarse a la base de datos:', err));
  
