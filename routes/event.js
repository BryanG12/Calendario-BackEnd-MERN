const { Router } = require("express");

const { getEventos, crearEvento, updateEvento, deleteEvento } = require("../controllers/event");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { existeUsuarioId, existeEventoId, eventoValidoParaUsuario } = require("../helpers/db-validator");


const router = Router();

router.use (validarJWT); // todos las rutas deben pasar por estos middlewares


router.get('/', getEventos);

router.post('/',[
  check('user', 'No es un id valido').isMongoId(),
  check('title', 'El titulo es necesario').not().isEmpty(),
  check('start', 'La fecha de inicio es necesaria').custom(isDate),
  check('end', 'La fecha de fin es necesaria').not().isEmpty(),
  check('user', 'El usuario es necesario').not().isEmpty(),
  check('user').custom( existeUsuarioId),
  validarCampos
], crearEvento);

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeEventoId),
  check('title', 'El titulo es necesario').not().isEmpty(),
  check('start', 'La fecha de inicio es necesaria').custom(isDate),
  check('end', 'La fecha de fin es necesaria').not().isEmpty(),
  validarCampos
] ,updateEvento);

router.delete('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeEventoId),
  validarCampos
] ,deleteEvento);


module.exports = router;
