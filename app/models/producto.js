var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ProductoSchema = new Schema({
    nombre: String,
    categoria: String,
    subCategoria: String,
    imagenes: [String],
    descripcion: String,
    tamanio: String,
    precio: String,
    noHojas: String,
    dibujo: String,
    cantidad: String,
    lomo: String,
    tipo: String,
    marca: String

});
module.exports = mongoose.model('Producto', ProductoSchema);
