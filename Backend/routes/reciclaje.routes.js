const {Router} = require("express");
const {check} = require("express-validator");

const { getReciclaje, postReciclaje, deleteReciclaje, putReciclaje } = require("../controllers/reciclaje.controllers");


const router = Router();

router.get('/', getReciclaje);
router.post('/', postReciclaje);
router.delete('/:id', deleteReciclaje);
router.put('/:id', putReciclaje);


module.exports = router;