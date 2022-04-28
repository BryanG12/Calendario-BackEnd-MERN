const { response,request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req=request, res=response, next) => {

  // x-token  headers

  const token = req.header('x-token');
  

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: 'No hay token'
    });
  }

  try {

    const { uid, name } = jwt.verify(token, process.env.JWT_SECRETORPRIVATE);

    req.uid = uid;
    req.name = name;

    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Error al validar token'
    });
  }

  next();


}


module.exports = {
  validarJWT
}