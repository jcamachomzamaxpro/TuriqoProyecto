const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    imagen: {
        type: String,
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'USER'
    },
    estado: {
        type: Boolean,
        default: true
    },
    googleSignIn: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Usuario', UsuarioSchema, 'usuarios');