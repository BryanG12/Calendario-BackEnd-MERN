const { request, response  } = require("express");
const Evento = require("../model/Evento");



const getEventos = async (req = request, res = response) => {


  const query = { estado: true };

  const eventos = await Evento.find(query).populate('user','name');

  res.status(200).json({
    ok: true,
    eventos
  });

}

const crearEvento = async(req = request, res = response) => {

  
  try {

    
    const { title, notes, start, end, user} = req.body;
    
    const evento = new Evento({title, notes, start, end, user});
    
    if(evento.user.toString() != req.uid){
      return res.status(401).json({
        ok: false,
        msg: "El token no corresponde al usuario"
      });
    }

    const eventoGuardado = await evento.save();


    return res.status(201).json({
      ok: true,
      evento:eventoGuardado
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con el administrador"
    });
  }

}


const updateEvento = async(req = request, res = response) => {

  const id  = req.params.id;

  try {
    
    const evento = await Evento.findById(id);

    if(evento.user.toString() != req.uid){
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para actualizar este evento"
      });
    }


    const nuevoEvento = {
      ...req.body,
      user: req.uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {new: true});

    return res.status(200).json({
      ok: true,
      evento: eventoActualizado
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con el administrador"
    });
  }


}

const deleteEvento = async(req = request, res = response) => {

  const { id } = req.params;

  const evento = await Evento.findById(id);

  try {
  
    if(evento.user.toString() != req.uid){
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar este evento"
      });
    }
  
  
    const eventoActualizado = await Evento.findByIdAndUpdate(id, {estado:false}, {new: true});
  
    return res.status(200).json({
      ok: true,
      evento: eventoActualizado
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con el administrador"
    });
  }


}






module.exports = {
  getEventos,
  crearEvento,
  updateEvento,
  deleteEvento
}