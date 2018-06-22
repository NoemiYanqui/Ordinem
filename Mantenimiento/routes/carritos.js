const express = require('express');
const router = express.Router();

//ruta  a modelo de carritos
const carritoModel = require('../models/carritos');
//ruta a modelo de items
const itemModel = require('../models/items');

//MANTENIMIENTO INCRUSTADO A ITEMS
router.get('/item',itemModel.findItem);
router.put('/item/:id',itemModel.updateItem);

//MANTENIMIENTO A CARRITOS
router.get('/',carritoModel.find);
router.get('/:id',carritoModel.findOne);
router.post('/',carritoModel.create);
router.put('/:id',carritoModel.update);
router.delete('/:id',carritoModel.delete);

module.exports = router;
