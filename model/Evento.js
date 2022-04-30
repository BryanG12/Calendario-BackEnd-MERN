const { Schema , model } = require('mongoose');


const EventoSchema = new Schema({

  title:{
    type: String,
    required: [true, 'el titulo es necesario']
  },
  notes:{
    type: String,
  },
  start:{
    type: Date,
    required: true
  },
  end:{
    type: Date,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estado:{
    type:Boolean,
    default:true
  }

});

EventoSchema.method('toJSON', function (){
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})



module.exports = model('Evento', EventoSchema);