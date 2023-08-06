const { response } = require("express");
const Evento = require("../models/Evento.js");


const getEventos = async(req, res = response ) => {

    const { until, from } = req.query;
    const query = { estado: true };

    const [ total, eventos ] = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
            .skip( Number( from ) )
            .limit(Number( until ))
    ]);

    res.json({
        total,
        eventos
    });
}

const postEventos = async(req, res = response ) => {

    const { estado, ...body } = req.body;

    const eventoDB = await Evento.findOne({ nombre: body.nombre });

    if ( eventoDB ) {
        return res.status(400).json({
            msg: `El evento ${ eventoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const evento = new Evento( data );

    // Guardar DB
    await evento.save();

    res.status(201).json(evento);

}


const deleteEventos = async(req, res = response ) => {

    const { id } = req.params;
    const eraseEvento = await Evento.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( eraseEvento );
} 


const putEventos = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;


    const evento = await Evento.findByIdAndUpdate(id, data, { new: true });

    res.json( evento );

}


module.exports = {
    getEventos,
    postEventos,
    deleteEventos,
    putEventos
}