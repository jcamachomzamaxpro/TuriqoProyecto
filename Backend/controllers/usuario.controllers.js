const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario.js");


// 17. getUsers
const getUsers = async(req, res)=>{
    const { hasta, desde} = req.query;
    const query = { estado: true };


    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( hasta ))
    ]);

    res.json({
        total,
        usuarios
    });
}


const postUser = async (req, res) => {
    const {nombre, email, password, rol} = req.body;

    const usuario = new Usuario({nombre, email, password, rol});

    //encriptacion
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // se guarda en mongo
    await usuario.save();
    res.json({
        msg: "POST API",
        usuario
    })
};


const deleteUser = async (req, res) => {
    // se extrae el id de los parametros (la url)
    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
};


const putUser = async (req, res) => {
    const {id} = req.params;

    const {_id, password, googleSignIn, ...resto} = req.body


    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    res.json({
        msg: "Se actualizó al usuario",
        usuario
    })
}




module.exports = {
    getUsers,
    postUser,
    deleteUser,
    putUser
}