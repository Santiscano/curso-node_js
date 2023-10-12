// https://www.npmjs.com/package/inquirer
const inquirer = require('inquirer');
require('colors');

// lista de opciones a escoger
const preguntas = [
    {
        type: 'list', // quiero mostrar una lista
        name: 'opcion', // nombre de lista con el que lo desestructurare
        message: '¿Qué desea hacer?', // mensaje dl usuario
        choices: [ // opciones a seleccionar
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            },
            
        ]
    }
];

/**
 *  funcion principal para la seleccion de opciones
 * @returns valor de la opcion seleccionada
 */
const inquirerMenu = async() => {

    // console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

/**
 * es un tipo input que cuando se le da enter envia la info, 
 * pero en este caso no usa dicha info asi que solo es una pausa
 */
const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

/**
 * metodo para escribir en consola
 * @param {*} message mensaje que se le mostrara al usuario
 * @returns valor escrito por usuario
 */
const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            // funcion interna de la libreria, el parametro value seria el message, pero ya la funcion lo reconoce asi que por eso se le pone un nombre libre
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

/**
 * con el array que recibimos lo convertimos en un choice que sera lo que se le entrega al nuevo prompt donde se solicitara la confirmacion
 * @param {*} tareas array tareas
 * @returns id tarea
 */
const listadoTareasBorrar = async( tareas = [] ) => {

    // retornamos un array con objetos con value y name
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    // agregamos en el array como primera opcion 0 que sera cancelar
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    // configuracion del prompt
    const preguntas = [
        {
            type: 'list', // tipo lista es desplazable con flechas
            name: 'id',
            message: 'Borrar',
            choices // array de opciones
        }
    ]

    // id es el value que se tomo de la lista
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

/**
 * funcion que preguntara la confirmacion de la accion
 * @param {*} message mensaje de pregunta
 * @returns boolean confirmacion
 */
const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm', // este tipo regresa un boolean
            name: 'ok',
            message // no necesita choice porque solo devolvera true false
        }
    ];

    // este ok es el boolean
    const { ok } = await inquirer.prompt(question);
    return ok;
}   

/**
 * toma el array de tareas y lo convierte en un prompt validando si tarea.completadoEn existe para mostrar esas como checkbox seleccionados
 * @param {*} tareas array tareas
 * @returns array de ids que sean true con el checkbox
 */
const mostrarListadoChecklist = async( tareas = [] ) => {
    
    // retornamos un array con objetos con value y name
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            // los choices inicializan todos seleccionados con esta validacion 
            // se meustran seleccionados los que cumplan la condicion 
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    // configuracion del prompt
    const pregunta = [
        {
            type: 'checkbox', // configuracion de checkbox
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
