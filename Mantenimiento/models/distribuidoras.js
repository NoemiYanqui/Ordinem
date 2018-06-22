const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const distribuidorasSchema  = new Schema({
  usuario_id : Number,
  ruc: String,
  nombre: String,
  telefono: String,
  direccion: String,
  email: String
});

const distribuidorasModel = mongoose.model('distribuidoras', distribuidorasSchema);

module.exports = {
  create: (req,res,next)=>{
    const distribuidora = new distribuidorasModel({
      _id: new mongoose.Types.ObjectId(),
      usuario_id: req.body.usuario_id,
      ruc: req.body.ruc,
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      email: req.body.email
    });
    distribuidora
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Distribuidora creada con exito',
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
    distribuidorasModel.update({_id:id},{$set: updateParams})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Distribuidora Actualizada'
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
    distribuidorasModel.findById(id)
        .select('_id usuario_id nombre ruc telefono direccion email')
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
    distribuidorasModel.remove({_id: id})
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
    distribuidorasModel.find()
      .select('_id usuario_id ruc nombre telefono direccion email')
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
