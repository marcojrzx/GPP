var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UsuarioSchema = new Schema({
    nombre: String,
    video: String,
    prueba: String,
    pass: String
});
module.exports = mongoose.model('Usuario', UsuarioSchema);
