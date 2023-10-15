const fs = require('fs');

const axios = require('axios');

// otras opciones son
// https://www.npmjs.com/package/request
// https://www.npmjs.com/package/node-fetch
// https://www.npmjs.com/package/axios

// https://www.mapbox.com/
// https://docs.mapbox.com/api/search/geocoding/


class Busquedas {
    
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB(); // leemos la base de datos al inicio para tener el arreglo listo
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')

        })
    }

    // params para la peticion axios.get
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = '' ) {

        try {
            // Petición http - crea instancia de axios
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`, //
                params: this.paramsMapbox // parametros como access-token, limit, language
            });

            // ejecuta instancia con get
            const resp = await intance.get();
            return resp.data.features.map( lugar => ({ // con ({}) hago que retorne un objeto literal y el map regresa el array
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            return []; // si genera error entrega un array vacio
        }
    }


    async climaLugar( lat, lon ) {

        try {
            
            // Petición http - crea instancia de axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data; // extrae info de la respuesta

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }

    }


    agregarHistorial( lugar = '' ) {
        // validamos si el lugar que se recibe por parametro en minuscula esta incuido en el array de this.historial
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return; // si es true termina la funcion
        }
        this.historial = this.historial.splice(0,5);
        // si pasa la validacion se agrega
        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerDB() {
        // validacion de que exista el archivo
        if( !fs.existsSync( this.dbPath ) ) return;
        // lee el archivo
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info ); // parsea el string de la data

        this.historial = data.historial; // asignamos la data al this.historial


    }

}





module.exports = Busquedas;