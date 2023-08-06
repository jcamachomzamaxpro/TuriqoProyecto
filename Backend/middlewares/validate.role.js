//24.1 Middleware para garantizar borrado solo por usuarios con ADMIN
const isAdminRole = ( req, res, next ) => {

    if ( !req.usuario ) {
       return res.status(500).json({
           msg: 'Se quiere verificar sin validar el token antes'
       });
   } 

   const { rol, nombre } = req.usuario;
   
   if ( rol !== 'ADMIN' ) {
       return res.status(401).json({
           msg: `${ nombre } no es administrador - No puede hacer esto`
       });
   }

   next();
}


module.exports = {
   isAdminRole
}