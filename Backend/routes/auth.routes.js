const {Router} = require("express");
const {check} = require("express-validator");

const { login } = require("../controllers/auth.controllers");
const { validateDocuments } = require("../middlewares/validate.documents");

const router = Router();

router.post('/login', [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'La password es obligatorio').not().isEmpty(),
    validateDocuments
], login);

module.exports = router;