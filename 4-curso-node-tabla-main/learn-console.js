const { argv, options } = require('yargs');

console.clear();

const [ arg1, arg2, ...args ] = process.argv;
// node .\4-curso-node-tabla-main\learn-console.js hola mundo 3

console.log('arg1: ', arg1);
console.log('arg2: ', arg2);
console.log('args: ', args);

// tambien podria asignarle un valor por defecto si viene vacio
const [ , , arg3= 'valor por defecto'] = process.argv; 
// node .\4-curso-node-tabla-main\learn-console.js
console.log('arg3: ', arg3);


// un ejemplo de como manipular si es un string
const [ , , argx = 'base=5' ] = process.env;
const [ , base = 5 ] = argx.split('=');


// instalar version especifica
// npm i colors@1.0.0


// TRABAJAR CON YARGS
// https://www.npmjs.com/package/yargs
const argv = require('yargs')
    .options('b', {  // como recomendacion primero se pone la forma corta del alias
        alias : 'base', // permite que se sepa que es -b o --base
        type: 'number', // tipo de dato, number, string, boolean, array o count
        describe : 'Base de la tabla', // documentacion comando 
        demandOption: true, // obligatorio
        default: 10, // valor por defecto si no manda propiedad
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean', // solo con el hecho de llamarlo ya se pondria en true
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    .check( (argv, options) => {
        console.log(argv)
        if( isNaN( argv.b )){
            throw 'asi podriamos poner condiciones para la informacion de consola, como por ejemplo la base debe ser numero'
        }
        return true // debe ponerse para confirmar que no hay errores;
    } )
    .argv; // argv es lo ultimo que se pone

console.log(argv);
// esto nos ayuda a que cuando se entregan argumentos yargs ya esta configurado para reconocerlos de
// diferentes maneras como por ejemplo si entrego --base=5 ó -b=5 ó base 5   - el sabe que nos referimos al mismo

