const { request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../model/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req=request, res=response) => {

  try {
    const { name, email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    
    if(usuario){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con este email'
      });
    }

    usuario = new Usuario({ name, email, password });
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
  
    await usuario.save();
    
    //Generar token
    const token = await generarJWT(usuario.id,usuario.name);

    res.status(201).json({
      ok:true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Error al crear usuario',
    })
  }
  
}


const loginUsuario = async(req=request, res=response) => {

  const {  email, password } = req.body;
  try {
    
    const usuario = await Usuario.findOne({ email });
    
    if(!usuario){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con este email'
      });
    }

    //confirmar las contraseñas

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no valida'
      });
    }

    //Generar token
    const token = await generarJWT(usuario.id,usuario.name);


    res.json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Error al crear usuario',
    })
  }

}

const revalidarToken = async (req=request, res=response) => {
  

  try {
    
    const uid = req.uid;
    const name = req.name;
  
  
  
    //Generar Nuevo token
    const token =  await generarJWT(uid,  name );
  
    res.json({
      ok: true,
      uid,
      name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Error al crear usuario',
    })
  }

}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}