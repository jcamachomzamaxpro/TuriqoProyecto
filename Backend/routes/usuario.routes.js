const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, postUser, deleteUser, putUser } = require("../controllers/usuario.controllers.js");

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);
router.delete('/:id', deleteUser);
router.put('/:id', putUser);

module.exports = router;