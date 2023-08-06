const { Router } = require("express");
const { check } = require("express-validator");

const { getEventos, postEventos, deleteEventos, putEventos } = require("../controllers/evento.controllers.js");


const router = Router();

router.get('/', getEventos);
router.post('/', postEventos);
router.delete('/:id', deleteEventos);
router.put('/:id', putEventos);


module.exports = router;