require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async() => {

    let opt = ''; // SERA EL VALOR QUE SE TOMA EN CONSOLA
    const tareas = new Tareas(); // CREAR INSTANCIA DE CLASE TAREAS

    const tareasDB = leerDB(); // lee la data del .json

    if ( tareasDB ) { // cargar tareas si existen
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // 1- Imprimir el menú
        opt = await inquirerMenu();

        // 2- este switch seria para ejecutar la funcion segun opcion seleccionada
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                // console.log(desc)
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        
        }


        guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt !== '0' ); // con el 0 la sesion termina en consola


    // pausa();

}


main();

