const { response } = require("express");
const Producto = require("../models/Producto.js");

const getProductos = async(req, res = response ) => {

    const { until, from } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', ['nombre'])
            .skip( Number( from ) )
            .limit(Number( until ))
    ]);

    res.json({
        total,
        productos
    });
}


const postProductos = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

}


const deleteProductos = async(req, res = response ) => {

    const { id } = req.params;
    const eraseProducto = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( eraseProducto );
} 


const putProductos = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );

}



module.exports = {
    getProductos,
    postProductos,
    deleteProductos,
    putProductos
}