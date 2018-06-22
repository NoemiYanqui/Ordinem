const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const registrosSchema  = new Schema({
  id_proveedor: Number,
  id_tienda : Number,
  id_carrito: Number,
  fecha: {type: Date, default: Date.now}
});

const registrosModel = mongoose.model('registros', registrosSchema);

module.exports = {
  create: (req,res,next)=>{
    const registro = new registrosModel({
      _id: new mongoose.Types.ObjectId(),
      id_proveedor: req.body.id_proveedor,
      id_tienda: req.body.id_tienda,
      id_carrito: req.body.id_carrito,
      fecha: req.body.fecha
    });
    registro
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Registro creado con exito',
          data: {
            ...result
          }
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  update: (req,res,next) =>{
    const id = req.params.id;
    let updateParams = {
      ...req.body
    };
    registrosModel.update({_id:id},{$set: updateParams})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Registro Actualizado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  findOne: (req,res,next) =>{
    const id = req.params.id;
    registrosModel.findById(id)
        .select('_id id_proveedor id_tienda id_carrito fecha')
        .exec()
        .then(doc =>{
          if (doc) {
            res.status(200).json({
              data:doc,
            });
          }else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
          }
        })
        .catch(err =>{
          console.log(err);
          res.status(500).json({
            error:err
          });
        });
  },
  delete: (req,res,next) => {
    const id = req.params.id;
    registrosModel.remove({_id: id})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Registro eliminado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  find: (req,res,next) => {
    registrosModel.find()
      .select('_id id_proveedor id_tienda id_carrito fecha')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          data: docs.map(doc=>{
            return{
              ...doc
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  }
};
