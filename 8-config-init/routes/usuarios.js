const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;


// 400 bad request - la ruta existe pero falto algo
// 401 no esta autenticado
// 403 esta protegido
// 404 no se encontro
// 500 info correcta del usuario pero alguna funcion revento en el servidor
// 


