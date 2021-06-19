const app = require('./app');
const server = require('http').Server(app);
const debug = require('debug')('app:server');

const port = process.env.PORT || 5000;
server.listen(port, () => {
  debug(`Servidor corriendo en el puerto: ${server.address().port}`);
});
