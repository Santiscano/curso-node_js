// https://nodejs.org/dist/latest-v18.x/docs/api/http.html#httpcreateserveroptions-requestlistener
const http = require('http');


http.createServer((req, res) => {
        // con esta forma podria descargarse un archivo csv como respuesta
        // res.setHeader('Content-Disposition', 'attachment: filename=lista.csv');
        // res.writeHead(200, { 'Content-Type': 'application/csv'});
        // res.write( 'id, nombre\n');
        // res.write( '1, Santiago\n');
        // res.write( '2, Estefany\n');
        // res.write( '3, Sami\n');
        // res.write( '4, Kiara\n');


        res.writeHead(200, { 'Content-Type': 'application/json' });

        let salida = {
            nombre: 'fernando',
            edad: 32,
            url: req.url
        }

        res.write(JSON.stringify(salida));
        // res.write('Hola Mundo');
        res.end();

    })
    .listen(8080);


console.log('Escuchando el puerto 8080');