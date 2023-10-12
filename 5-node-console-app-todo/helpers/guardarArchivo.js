const fs = require('fs');

const archivo = './db/data.json';

/**
 * funcion para escribir en el objeto json la data que le entregue
 * @param {*} data data que quiero guardar
 */
const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

/**
 * funcion para leer el archivo si ya existe
 * @returns los datos existentes
 */
const leerDB = () => {
    
    if( !fs.existsSync(archivo) ){
        return null;
    }
    
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    // console.log(data);

    return data;
}



module.exports = {
    guardarDB,
    leerDB
}