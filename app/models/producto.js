var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ProductoSchema = new Schema({
    nombre: String,
    categoria: String,
    imagenes: [String],
    descripcion: String,
    tamanio: String,
    precio: String

});
module.exports = mongoose.model('Producto', ProductoSchema);
