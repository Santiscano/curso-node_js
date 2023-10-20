# PASOS PARA CREAR UN PROYECTO EN TYPESCRIPT CON EXPRESS

1 - tener instalado typescript y ts-node de manera global
    npm i -g typescript ts-node
    tsc -v
    ts-node -v

2 - inicializar package.json
    npm init -y

3 - crear archivo configuracion de typescript
    tsc --init
3.1 - configurar segun necesidad el archivo, como por ejemplo a que configurara y otros

4 - agregar el tslint como reglas de desarrollo (opcional)
    npm i tslint --save-dev
4.1 - configurar el tslint
4.2 - instalar ts local para el proyecto para configurar el tslint (despues se podria eliminar)
    npm i -g typescript --save-dev
4.3 - ejecutar este archivo para que cree el tslint.json
    ./node_modules/.bin/tslint --init
4.4 - configurar las reglas a gusto o necesidad

5 - Crear servidor de express
6 - Levantar servidor - configurando el package.json
