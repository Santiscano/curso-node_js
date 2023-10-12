const fs = require('fs');

// se hace la referencia af
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
    
    if( !fs.existsSync(archivo) ){ // si no existe archivo termina la funcion
        return null;
    }
    
    // lee sincrono y la codificacion es para que no devuelva los bites
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' }); 
    const data = JSON.parse( info ); // transformamos la info de string a json

    // console.log(data);

    return data;
}



module.exports = {
    guardarDB,
    leerDB
}