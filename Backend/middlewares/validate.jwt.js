const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');


const validateJWT = async(  req = request, res = response, next) => {

    //leer token jwt desde los headers de la request
    const token = req.header('x-api-token-jwt');


    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        

        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );


        // leer el usuario que corresponde al uid
         const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        } 

        // Verificar si el uid tiene estado true
         if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        } 
        
        
        req.usuario = usuario; 
        console.log("req usuario en validate",req.usuario);
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}


module.exports = {
    validateJWT
}