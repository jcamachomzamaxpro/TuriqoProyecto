const { response } = require("express");
const Reciclaje = require("../models/Reciclaje.js");


const getReciclaje = async(req, res = response ) => {

    const { until, from } = req.query;
    const query = { estado: true };

    const [ total, reciclaje ] = await Promise.all([
        Reciclaje.countDocuments(query),
        Reciclaje.find(query)
            .skip( Number( from ) )
            .limit(Number( until ))
    ]);

    res.json({
        total,
        reciclaje
    });
}

const postReciclaje = async(req, res = response ) => {

    const { estado, ...body } = req.body;

    const reciclajeDB = await Reciclaje.findOne({ color: body.color });

    if ( reciclajeDB ) {
        return res.status(400).json({
            msg: `${ reciclajeDB.color }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        color: body.color.toUpperCase(),
    }

    const reciclaje = new Reciclaje( data );

    // Guardar DB
    await reciclaje.save();

    res.status(201).json(reciclaje);

}


const deleteReciclaje = async(req, res = response ) => {

    const { id } = req.params;
    const eraseReciclaje = await Reciclaje.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( eraseReciclaje );
} 


const putReciclaje = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;


    const reciclaje = await Reciclaje.findByIdAndUpdate(id, data, { new: true });

    res.json( reciclaje );

};



module.exports = {
    getReciclaje,
    postReciclaje,
    deleteReciclaje,
    putReciclaje
}