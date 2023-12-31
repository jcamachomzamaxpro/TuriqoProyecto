const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");


class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.productoPath = '/api/productos';
        this.eventosPath = '/api/eventos';
        this.reciclajePath = '/api/reciclaje'
        this.userPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.searchPath = '/api/search';

        // Conexion DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // cors
        this.app.use(cors());

        // Leer y parsear JSON en BODY
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth.routes.js"));

        this.app.use(this.productoPath, require("../routes/producto.routes.js"));
        this.app.use(this.userPath, require("../routes/usuario.routes.js"));
        this.app.use(this.eventosPath, require("../routes/evento.routes.js"));
        this.app.use(this.reciclajePath, require("../routes/reciclaje.routes.js"));
        this.app.use(this.searchPath, require("../routes/search.routes.js"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendose en ${this.port}`);
        })
    }

}

module.exports = Server;