const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const usuariosSchema    =new Schema({
  //usuario_id: Number,
  usuario: {type: String, lowercase: true},
  password: {type: String, minLength: 6},
  tipo: String
});

const usuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = {
create: (req,res,next)=>{
  const usuario = new usuariosModel({
    _id: new mongoose.Types.ObjectId(),
    usuario: req.body.usuario,
    password: req.body.password,
    tipo: req.body.tipo
  });
  usuario
    .save()
    .then(result=>{
      res.status(200).json({
        message: 'Usuario creado con exito',
        data: {
          ...result
        }
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
},

  find: (req,res,next)=>{
    usuariosModel.find()
      .select('_id usuario password tipo')
      .exec()
      .then(docs=>{
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
  },

  update: (req,res,next)=>{
    const id = req.params.id;
    let updateParams = {
      ...req.body
    };
    usuariosModel.update({_id:id},{$set: updateParams})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'Usuario Actualizado'
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
  },

  findOne:(req,res,next)=>{
    const id = req.params.id;
    usuariosModel.findById(id)
      .select('_id usuario password tipo')
      .exec()
      .then(doc=>{
        if (doc) {
          res.status(200).json({
            data:doc,
          });
        }else {
          res.status(404).json({message: 'No valid entry found for provided ID'});
        }
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },

  delete: (req,res,next)=>{
    const id = req.params.id;
    usuariosModel.remove({_id: id})
      .exec()
      .then(result=>{
        res.status(200).json({
          message: 'Usuario Eliminado'
        });
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  }
};
