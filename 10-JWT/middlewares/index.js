

const validaCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');

module.exports = {
    ...validaCampos, // con el spreed exporto todo lo que exporte cada archivo
    ...validarJWT,
    ...validaRoles,
}