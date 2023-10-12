require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes')

// ESTE ERA UN EJEMPLO MANUAL
// const main = async() => {
//     do {
        
//         opt = await mostrarMenu();
//         console.log({opt});
//         await pausa();
//     } while ( opt !== '0' );
// }
console.clear();

const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');


const main = async() => {
    let opt = '';
    const tareas = new Tareas(); // CREAR INSTANCIA DE CLASE TAREAS

    const tareasDB = leerDB(); // lee la data del .json

    do { 

        // 1- preguntamos con la lista del menu
        opt = await inquirerMenu();

        // 2- recorremos el switch segun opcion seleccionada
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                // console.log(desc)
                tareas.crearTarea( desc );
            break;

            case '2':
                // console.log(tareas._listado);  // esto lo mostraria como instancias de clases
                console.log(tareas.listadoArr)
                // console.log(tareas.listadoCompleto());
                // tareas.listadoCompleto();
            break;
        }

        console.log({opt});
        guardarDB( tareas.listadoArr );

        await pausa();

        // await pausa();
    } while ( opt !== '0' );
}

main();