const express = require('express');
const router = express.Router();

const usuarioModel = require('../models/usuarios');

router.get('/',usuarioModel.find);
router.get('/:id',usuarioModel.findOne);
router.post('/',usuarioModel.create);
router.put('/:id',usuarioModel.update);
router.delete('/:id',usuarioModel.delete);

module.exports = router;
