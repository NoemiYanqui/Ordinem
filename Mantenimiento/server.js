// importamos los paquetes nesesarios
var express = require('express');
var app = express();
var bodyParser = require('body-Parser');

// configuramos nuestra app para usar bodyParser
//el cual nos permitira obtener data enviada por POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;   //configuramos nuestro puerto

//ROUTES FOR OUR API
//===================================================================
var router = express.Router();

//ruta de prueba para ver si todo funciona (accesible por GET http://localhost:8080/api)
router.get('/',function(req, res){
  res.json({message: 'genial! bienvenido a nuestra api!'});
});

/////////////////////////////////////////////////////////////////////////////////////////////
var carritosRouter = require('./routes/carritos');
router.use('/carritos', carritosRouter);

var tiendasRouter = require('./routes/tiendas');
router.use('/tiendas', tiendasRouter);

var registrosRouter = require('./routes/registros');
router.use('/registros',registrosRouter);

var usuariosRouter = require('./routes/usuarios');
router.use('/usuarios', usuariosRouter);

var distribuidorasRouter = require('./routes/distribuidoras');
router.use('/distribuidoras', distribuidorasRouter);

var productosRouter = require('./routes/productos');
router.use('/productos', productosRouter);
////////////////////////////////////////////////////////////////////////////////////////7777777

//REGISTRAMOS NUESTRAS RUTAS--------------------------------
//todas nuestras rutas tendran el prefijo /API
app.use('/api', router);

//Nos conectamos a nuestra base de datos
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Ordinem');
mongoose.Promise = global.Promise;

//INICIAMOS EL SERVIDOR
//===================================================================
app.listen(port);
console.log('La magia sucede en el puerto'+" " + port);
