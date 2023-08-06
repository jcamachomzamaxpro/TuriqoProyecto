const {Router} = require("express");
const {check} = require("express-validator");

const { getReciclaje, postReciclaje, deleteReciclaje, putReciclaje } = require("../controllers/reciclaje.controllers");
const { validateJWT } = require("../middlewares/validate.jwt");
const { isAdminRole } = require("../middlewares/validate.role");
const { validateDocuments } = require("../middlewares/validate.documents");


const router = Router();

router.get('/', getReciclaje);
router.post('/', [
    validateJWT,
    validateDocuments,
], postReciclaje);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalido').isMongoId(),
    validateDocuments,
], deleteReciclaje);
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalido').isMongoId(),
    validateDocuments,
], putReciclaje);


module.exports = router;