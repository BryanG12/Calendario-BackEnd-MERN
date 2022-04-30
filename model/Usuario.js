const { Schema , model } = require('mongoose');


const UsuarioSchema = new Schema({
  name:{
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email:{
    type: String,
    unique: true,
    required: [true, 'El correo es obligatorio']
  },
  password:{
    type: String,
    required: [true, 'El password es obligatorio']
  },
  estado:{
    type:Boolean,
    default:true
  }
})



module.exports = model('Usuario', UsuarioSchema);