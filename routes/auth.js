
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido, ingrese uno correcto').isEmail(),
  check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
  validarCampos
], crearUsuario);

router.post('/',[
  check('email', 'El email es invalido, ingrese uno correcto').isEmail(),
  check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
  validarCampos
],loginUsuario);

router.get('/renew',validarJWT ,revalidarToken);



module.exports = router;



