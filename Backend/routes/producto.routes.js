const { Router } = require("express");
const { check } = require("express-validator");

const { getProductos, postProductos, deleteProductos, putProductos } = require("../controllers/producto.controllers.js");


const router = Router();

router.get('/', getProductos);
router.post('/', postProductos);
router.delete('/:id', deleteProductos);
router.put('/:id', putProductos);



module.exports = router;
