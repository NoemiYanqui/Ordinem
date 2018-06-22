const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const carritosSchema  = new Schema({
  id_carrito: Number,
  items: {
    id_producto: Number,
    cantidad: Number,
    sub_total:Number,
  },
  total:Number
});

const carritosModel = mongoose.model('carritos', carritosSchema);

module.exports = {
  modelo: carritosModel,
  create: (req,res,next)=>{
    const carrito = new carritosModel({
      _id: new mongoose.Types.ObjectId(),
      total: req.body.total
    });

    carrito
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'carrito creado con exito',
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
    carritosModel.update({_id:id},{$set: updateParams})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Carrito Actualizado'
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
    carritosModel.findById(id)
        .select('_id items total')
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
    carritosModel.remove({_id: id})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'carrito eliminado'
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
    carritosModel.find()
      .select(  )
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
