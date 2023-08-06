const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, postUser, deleteUser, putUser } = require("../controllers/usuario.controllers.js");
const { validateDocuments } = require("../middlewares/validate.documents.js");
const { validateJWT } = require("../middlewares/validate.jwt.js");
const { isAdminRole } = require("../middlewares/validate.role.js");

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('nombre', 'Nombre Invalido').not().isEmpty(),
    check('password', 'Password invalida (min 6 letras)').isLength({min :6}),
    check('email', 'No es un email valido').isEmail(),
    validateDocuments
], postUser);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalido').isMongoId(),
    validateDocuments
], deleteUser);
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID Invalido').isMongoId(),
    validateDocuments
], putUser);

module.exports = router;