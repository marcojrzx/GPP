var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CategoriaSchema = new Schema({
    nombreCategoria: String,
    categoriaID: String,
    subcategoria: [{
                    nombreSubCategoria: String,
                    subcategoriaID: String
                           }],

});
module.exports = mongoose.model('Categoria', CategoriaSchema);
