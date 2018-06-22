const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tiendasSchema = new Schema({
  usuario_id: Number,
  nombre: String,
  propietario:{
    ape_pat: String,
    ape_mat: String,
    nombres: String,
    distrito: String,
    direccion: String,
    dni: {type: String, min: 8}
  },
  ruc: {type: String, min: 11, max:11, require:true}
});

const tiendasModel = mongoose.model('tiendas', tiendasSchema);

module.exports = {
  modelo: tiendasModel,
  create: (req,res,next)=>{
    const tienda = new tiendasModel({
      _id: new mongoose.Types.ObjectId(),
      usuario_id: req.body.usuario_id,
      nombre: req.body.nombre,
      ruc: req.body.ruc
    });

    tienda
      .save()
      .then(result =>{
        res.status(200).json({
          message: 'Tienda creada con exito',
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
    tiendasModel.update({_id:id},{$set: updateParams})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Tienda Actualizada'
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
    tiendasModel.findById(id)
        .select('_id usuario_id nombre propietario ruc')
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
    tiendasModel.remove({_id: id})
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Tienda eliminada'
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
    tiendasModel.find()
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
