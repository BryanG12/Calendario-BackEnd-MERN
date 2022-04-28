const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name )=>{

  return new Promise( (resolve, reject)=>{
    
    const payload = { uid, name };
  
  
    jwt.sign(payload, process.env.JWT_SECRETORPRIVATE,{
      expiresIn:'2h'
    },( err, tokent) =>{
      if(err){
        console.log(err);
        reject('Error al generar el token');
      }
      resolve(tokent);
    })
    
  });


}


module.exports = {
  generarJWT
}