const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productosSchema  = new Schema({
  nombre: String,
  foto : String,
  precio: Number,
  disponibilidad: Number,
  categoria: String,
  marca: String,
  id_distribuidora: Number
});

const productosModel = mongoose.model('productos', productosSchema);

module.exports = {
  create: (req,res,next)=>{
    const producto = new productosModel({
      _id: new mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      foto: req.body.foto,
      precio: req.body.precio,
      disponibilidad: req.body.disponibilidad,
      categoria: req.body.categoria,
      marca: req.body.marca,
      id_distribuidora: req.body.id_distribuidora
    });
    producto
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Producto creado con exito',
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
    productosModel.update({_id:id},{$set: updateParams})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Producto Actualizado'
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
    productosModel.findById(id)
        .select('_id nombre foto precio disponibilidad categoria marca id_distribuidora')
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
    productosModel.remove({_id: id})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Producto eliminado'
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
    productosModel.find()
      .select('_id nombre foto precio disponibilidad categoria marca id_distribuidora')
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
