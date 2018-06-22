const express = require('express');
const router = express.Router();

const registroModel = require('../models/registros');

router.get('/',registroModel.find);
router.get('/:id',registroModel.findOne);
router.post('/',registroModel.create);
router.put('/:id',registroModel.update);
router.delete('/:id',registroModel.delete);

module.exports = router;
