// https://www.npmjs.com/package/express-fileupload
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        // del array de files que viene en el req.files extraemos archivo que es el nombre que le puso desde el frontend
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.'); // nombre cortado en array
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) { // compara si la extension esta incluida en la lista de extensiones validas
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`); 
        }
        
        const nombreTemp = uuidv4() + '.' + extension; // nombre temporal entre uuid y extension
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp ); // ruta para subir el archivo

        archivo.mv(uploadPath, (err) => { // mv es una funcion de express-file y es de mover y el callback es de error
            if (err) {
                reject(err);
            }

            resolve( nombreTemp ); //
        });

    });

}



module.exports = {
    subirArchivo
}