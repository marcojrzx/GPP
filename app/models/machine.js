var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var MaquinaSchema = new Schema({
    modelo: String,
    descripcion: String,
    administrador: String,
    manuales: [String]
});
module.exports = mongoose.model('Maquina', MaquinaSchema);
