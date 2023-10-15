// orden de importaciones
// 1 - de node
// 2 - terceros ejemplo dotenv
// 3 - archivos propios
require('dotenv').config();
const Server = require('./models/server');


const server = new Server();



server.listen();