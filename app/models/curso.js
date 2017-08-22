var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CursoSchema = new Schema({
    nombre: String,
    lenguaje: String,
    imagenes: [String]
});
module.exports = mongoose.model('Curso', CursoSchema);
