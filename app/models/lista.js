var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ListaSchema = new Schema({
    idEtapa: String,
    idGrado: String,
    productos: [{
          nombreProducto: String,
          descripcionProducto: String,
          categoriaProducto: String,
          subcategoriaID: String,
          precioProducto: String
    }]
});
module.exports = mongoose.model('Lista', ListaSchema);
