const express = require('express');
const router = express.Router();

//RUTAS A LOS MODELOS
const tiendasModel = require('../models/tiendas');
const propietarioModel = require('../models/propietarios');

//MANTENIMIENTO A LOS PROPIETARIOS
router.get('/propietario',propietarioModel.findPropietario);
router.put('/propietario/:id',propietarioModel.updatePropietario);

//MANTENIMIENTO A LAS TIENDAS
router.get('/',tiendasModel.find);
router.get('/:id',tiendasModel.findOne);
router.post('/',tiendasModel.create);
router.put('/:id',tiendasModel.update);
router.delete('/:id',tiendasModel.delete);

module.exports = router;
