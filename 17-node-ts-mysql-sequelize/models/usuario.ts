import { DataTypes } from 'sequelize'; // DataTypes es los tipos de datos
import db from '../db/connection';

/**
 * el modelo debe tener los mismos campos que la base de datos creada
 */
const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});


export default Usuario;