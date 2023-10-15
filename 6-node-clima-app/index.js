require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    // ciclo infinito do while
    do{
        // primer pregunta lista de opciones, buscar, historial o salir
        opt = await inquirerMenu();
        // con el valor capturado escogemos 1 caso
        switch( opt ) {

            case 1:
                // Pregunta de la ciudad a buscar
                const termino = await leerInput('Ciudad: ');
                
                // Buscar los lugares - entrego como parametro la cuidad y retorna un array de objetos con id, ciudad log lat
                const lugares = await busquedas.ciudad( termino );
                
                // de la lista que se recibe preguntamos el lugar y entregamos el numero
                const id = await listarLugares(lugares);
                if ( id === '0' ) continue; // si id es 0 cotinue sigue la siguiente iteracion del ciclo

                const lugarSel = lugares.find( l => l.id === id ); // lugar seleccionado

                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Como está el clima:',  clima.desc.green );

            break;


            case 2:
                 busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ lugar } ` );
                 })

            break;

        }



        if ( opt !== 0 ) await pausa();

    } while ( opt !== 0 )



}



main();