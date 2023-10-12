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

    console.clear();
    let opt = ''; // SERA EL VALOR QUE SE TOMA EN CONSOLA
    const tareas = new Tareas(); // CREAR INSTANCIA DE CLASE TAREAS

    const tareasDB = leerDB(); // lee la data del .json

    if ( tareasDB ) { // tareasDB es un array con los objetos de las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // 1- Imprimir el menú
        opt = await inquirerMenu();

        // 2- este switch seria para ejecutar la funcion segun opcion seleccionada
        switch (opt) {
            case '1':
                // crear tarea segun el valor entregado en el input
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
                // retorna array de ids que tengan completadoEn !== null
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids ); //
            break;

            case '6': // Borrar
                // pregunta que tarea quiere eliminar y la retorna
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) { // 0 es cancelar
                    // pregunta si esta seguro y retorna un boolean
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) { // si es true ejecuta eliminar
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        
        }


        guardarDB( tareas.listadoArr );

        await pausa();  // solicita otro enter para volver al ciclo

    } while( opt !== '0' ); // con el 0 la sesion termina en consola


    // pausa();

}


main();

