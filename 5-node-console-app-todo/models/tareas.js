const Tarea = require('./tarea');

/**
 *  EJEMPLO DE COMO SERA EL LISTADO
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tareas {

    /**
     * objeto con los valores de las tareas
     * {
        'uuid': Tarea {
            id: 'uuid',
            desc: 'hola tarea 1',
            completadoEn: null
        },
        'uuid': Tarea {
            id: 'uuid',
            desc: 'hola tarea 2',
            completadoEn: null
        }
        }
     */
    _listado = {
        // 'abc': 123
    };


    /**
     * con este get convertimos el objeto que tenemos de tareas en un array instancias de tareas es decir diferentes tareas pero en clases
     */
    get listadoArr() {
        // return Object.keys(this._listado)
        const listado = [];
        // Object.keys convierte en array de claves y se recorre y key seria cada clave
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]; // esto esta filtrando la tarea por key
            // pushea las instancias de las tareas creadas
            listado.push( tarea );
        });

        return listado;
    }


    constructor() {
        this._listado = {};
    }

    /**
     * elimina una tarea basado en el id
     * @param {*} id uuid que quiero eliminar
     */
    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    /**
     * recibe un array con las tareas y lo almacena en _listado con la clave [tarea.id]
     * @param {*} tareas  array con las tareas
     */
    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    /**
     * crea tareas y la guarda en el objeto _listado
     * @param {*} desc descripcion o mensaje que se guardara
     */
    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        // this._listado['abc'];    // estas 2 serian formas de llamar al objeto
        // this._listado.abc;      // en dicha clave
        this._listado[tarea.id] = tarea;
    }

    /**
     * tomamos el array de las tareas y lo imprime mostrando cada tarea con su estado
     */
    listadoCompleto() {
        
        console.log(); // esto es como un salto de linea porque al final todo se muestra en consola
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green; // lista numerica 1,2,3,4,5....
            const { desc, completadoEn } = tarea; // desestructura informacion
            const estado = ( completadoEn ) // booleano de completa o pendiente
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`); // impresion de cada tarea

        });         
    }

    /**
     * recorre el array de las tareas y separamos segun el parametro las pendientes o completas
     * @param {*} completadas boolean completadas=true, pendientes=false
     */
    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => { //recorre array de tareas

            const { desc, completadoEn } = tarea; // desestructura info
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) { // si el parametro es true
                // mostrar completadas
                if ( completadoEn ) { // si la fecha no es null es porque es completa
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else { // si el parametro es false
                // mostrar pendientes
                if ( !completadoEn ) { // si la fecha es null esta pendiente
                    contador += 1;
                    console.log(`${ (contador + '.').red } ${ desc } :: ${ estado }`);
                }
            }

        });     

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }

}



module.exports = Tareas;
