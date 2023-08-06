const { Router } = require("express");
const { check } = require("express-validator");

const { getProductos, postProductos, deleteProductos, putProductos } = require("../controllers/producto.controllers.js");
const { validateJWT } = require("../middlewares/validate.jwt.js");
const { isAdminRole } = require("../middlewares/validate.role.js");
const { validateDocuments } = require("../middlewares/validate.documents.js");


const router = Router();

router.get('/', getProductos);
router.post('/', [
    validateJWT,
    validateDocuments
], postProductos);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalida').isMongoId(),
    validateDocuments
], deleteProductos);
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalida').isMongoId(),
    validateDocuments
], putProductos);



module.exports = router;
