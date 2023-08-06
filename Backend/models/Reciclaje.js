const {Schema, model} = require('mongoose');

const ReciclajeSchema = Schema({
    imagen: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required : [true, 'El color es obligatorio']
    },
    descripcion: {
        type: String,
        required: true
    },
    cssColor: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Reciclaje', ReciclajeSchema, 'reciclaje');