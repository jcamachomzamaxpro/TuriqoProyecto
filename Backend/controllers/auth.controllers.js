const {response} = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generateJWT } = require("../helpers/generate.JWT");

const login = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        
        // Verificar que el correo exista
        const usuario = await Usuario.findOne({email});

        if (!email) {
            return res.status(400).json({
                msg: "Usuario no es correcto"
            })
        }

        // Verificar que el usuario tenga un estado de activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:"Estado Inactivo"
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg:"Password Incorrecta"
            })
        }




        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Contacte al servicio tecnico"
        })
    }

}


module.exports = {
    login
}