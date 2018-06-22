const express = require('express');
const router = express.Router();

const productoModel = require('../models/productos');

router.get('/',productoModel.find);
router.get('/:id',productoModel.findOne);
router.post('/',productoModel.create);
router.put('/:id',productoModel.update);
router.delete('/:id',productoModel.delete);

module.exports = router;
