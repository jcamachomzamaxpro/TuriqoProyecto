const {Schema, model} = require("mongoose");

const EventoSchema = Schema({
    imagen: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    popularidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
    },
    claseEvento: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Evento', EventoSchema, 'eventos');