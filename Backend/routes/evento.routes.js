const { Router } = require("express");
const { check } = require("express-validator");

const { getEventos, postEventos, deleteEventos, putEventos } = require("../controllers/evento.controllers.js");
const { validateJWT } = require("../middlewares/validate.jwt.js");
const { validateDocuments } = require("../middlewares/validate.documents.js");
const { isAdminRole } = require("../middlewares/validate.role.js");


const router = Router();

router.get('/', getEventos);
router.post('/', [
    validateJWT,
    validateDocuments
], postEventos);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalida').isMongoId(),
    validateDocuments
], deleteEventos);
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalida').isMongoId(),
    validateDocuments
], putEventos);


module.exports = router;