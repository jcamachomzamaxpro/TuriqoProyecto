const { Router } = require("express");
const { search } = require("./producto.routes.js");

const router = Router();

router.get('/:coleccion/:criterio', search);


module.exports = router;