const express = require("express");
const cors = require('cors');
const dbConnection = require("../database/config");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
    };
    
     //Conexion a base de datos
    this.conectarDB();

    this.middlewares();

    this.routers();

  }

  async conectarDB(){
    await dbConnection();
  }


  middlewares() {
    
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

   //Directorio publico
    this.app.use( express.static('public'));
  }

  routers() {

    this.app.use(this.paths.auth, require("../routes/auth"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
