const objetoModelo = require("./tiendas.js");
const tiendasModel = objetoModelo.modelo

module.exports = {
  updatePropietario: (req,res,next) =>{
    const id_Tienda = req.params.id;
    let updateParams = {
      ...req.body
    };
    tiendasModel.update({_id:id_Tienda},{$set: {propietario: updateParams}})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Propietario de Tienda Actualizado'
        });
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  },
  findPropietario: (req,res,next) => {
    tiendasModel.find()
      .select( '_id propietario' )
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
