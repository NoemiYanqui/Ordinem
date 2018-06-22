const express = require('express');
const router = express.Router();

const distribuidoraModel = require('../models/distribuidoras');

router.get('/',distribuidoraModel.find);
router.get('/:id',distribuidoraModel.findOne);
router.post('/',distribuidoraModel.create);
router.put('/:id',distribuidoraModel.update);
router.delete('/:id',distribuidoraModel.delete);

module.exports = router;
