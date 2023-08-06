const { Router } = require("express");
const { check } = require("express-validator");

const { getProductos, postProductos } = require("../controllers/producto.controllers.js");


const router = Router();

router.get('/', getProductos);
router.post('/', postProductos);



module.exports = router;
