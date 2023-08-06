const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Usuario = require("../models/Usuario.js");
const Producto = require("../models/Producto.js");
const Evento = require("../models/Evento.js");

const allowedCollections = [
    'usuarios',
    'productos',
    'eventos'
]

const searchUsers = async ( criterio = '', res = response ) => {
    const isMongoID = ObjectId.isValid(criterio); //true

    if (isMongoID) {
        const usuario = await Usuario.findById(criterio);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(criterio, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { email: regex }],
        $and: [{ estado: true}]
    });
    
    res.json({
        results: usuarios
    });
}


const searchProductos = async ( criterio = '', res = response) => {
    const isMongoID = ObjectId.isValid(criterio); //true

    if (isMongoID) {
        const producto = await Producto.findById(criterio);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(criterio, 'i');
    const productos = await Producto.find({ nombre: regex, estado: true });
    
    res.json({
        results: productos
    });

}


const searchEventos = async ( criterio = '', res = response) => {
    const isMongoID = ObjectId.isValid(criterio); //true

    if (isMongoID) {
        const evento = await Evento.findById(criterio);
        return res.json({
            results: (evento) ? [evento] : []
        });
    }

    const regex = new RegExp(criterio, 'i');
    const eventos = await Evento.find({ nombre: regex, estado: true });
    
    res.json({
        results: eventos
    });
    

}


const search = ( req, res = response ) => {
    
    const { coleccion, criterio  } = req.params;

    if (!allowedCollections.includes(coleccion)){
        return res.status(400).json({
            msg: `El buscador solo permite las colecciones: ${allowedCollections}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            searchUsers(criterio, res);
        break;
        case 'productos':
            searchProductos(criterio, res);
        break;
        case 'eventos':
            searchEventos(criterio, res);
        break;

        default:
            res.status(500).json({
                msg: 'La busqueda no existe'
            })
    }

  

}



module.exports = {
    search
}