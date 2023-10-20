// https://sequelize.org/
// https://sequelize.org/docs/v6/getting-started/

import { Sequelize } from 'sequelize';


/**
 * la instancia de Sequelize recibe los siguientes parametros en la priimer firma
 * 1 - nombre base de datos
 * 2 - username "root"
 * 3 - contraseña
 * 4 - objeto de configuracion con host, base de datos y logging, normalmente se configura en false
 */
const db = new Sequelize('node', 'demos', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,  // evita que el impacto a la base de datos se vea en la consola
});

export default db;
