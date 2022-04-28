const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) => {

  const errors = validationResult(req); // contiene los errores de validacion

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors:errors.mapped()
    });
  }

  next();

}

module.exports = {
  validarCampos
}