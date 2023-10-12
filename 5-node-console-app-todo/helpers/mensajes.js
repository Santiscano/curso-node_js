require('colors');


const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('==========================\n'.green);

        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        // interface para mostrar y recibir info del usuario
        const readline = require('readline').createInterface({
            input: process.stdin, // pausa la ejecucion
            output: process.stdout // mostrar mensaje cuando se pide info
        });

        // mostrar info con una pregunta
        readline.question('Seleccione una opción: ', (opt) => { // parametro del callback es la info recibida
            console.log('opt: ', opt);
            readline.close(); // cuando se termina de usar hay que cerrarlo
            resolve(opt);
        })

    });

    

}

const pausa = () => {
    // asi la funcion retorna la promesa para que no caiga en un ciclo infinito con el do while
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}


module.exports = {
    mostrarMenu,
    pausa
}