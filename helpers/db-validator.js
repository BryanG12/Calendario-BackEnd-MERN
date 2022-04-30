const Evento = require("../model/Evento");
const Usuario = require("../model/Usuario");


const existeUsuarioId = async (user )=>{
  
  const existeId = await Usuario.findById(user).where({estado:true})
  if(!existeId){
    throw new Error(`El Usuario: ${user} no existe`);
  }
}

const existeEventoId = async (id )=>{

  const existeEvento = await Evento.findById(id).where({estado:true});
  if(!existeEvento){
    throw new Error(`El Evento: ${id} no existe`);
  }
}



module.exports = {
  existeUsuarioId,
  existeEventoId
}