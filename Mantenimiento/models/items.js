const objetoModelo = require("./carritos.js");
const carritosModel = objetoModelo.modelo

module.exports = {
  updateItem: (req,res,next) =>{
    const id_Carrito = req.params.id;
    let updateParams = {
      ...req.body
    };
    carritosModel.update({_id:id_Carrito},{$set: {items: updateParams}})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Item de Carrito Actualizado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  findItem: (req,res,next) => {
    carritosModel.find()
      .select( '_id items' )
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
  },
  delete: (req,res,next) => {
    const id = req.params.id;
    itemModel.remove({_id: id},{$set: {items: updateParams}} )
      .exec()
      .then(result =>{
        res.status(200).json({
          message: 'Item eliminado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
};
