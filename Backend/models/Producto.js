const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    imagen: {
        type: String,
        required: true
    },
    nombre: {
        type: String, 
        required: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
    },
    departamento: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    precioPromedio: {
        type: Number,
        required: true
    },
    precioMaximo: {
        type: Number,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    estado: {
        type: Boolean,
        default: true
    }
})

ProductoSchema.methods.toJSON = function() {
    const { __v, state, ...data  } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema, 'productos');