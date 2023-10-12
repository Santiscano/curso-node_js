const argv = require('yargs')
    .options('b', {
        alias: 'base' ,
        type:'number',
        describe : "Base directory",
        demandOption: true,
        default: 7
    })
    .options('v', {
        alias:"view",
        type:'boolean',
        default: false,
        describe :"View the result"
    })
    .argv;

console.clear();

console.log('argv', argv);
