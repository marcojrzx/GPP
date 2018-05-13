var express = require('express');

var mongoose = require('mongoose');

//var Incidencia= require('../app/models/maquina');
var Producto = require('../app/models/producto');
var Categoria = require('../app/models/categoria');
var Lista = require('../app/models/lista');


var cron = require('cron');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var request = require('request');

var router = express.Router();

var multer  = require('multer')
const fs = require('fs');

/*passport.use(new Strategy(
  function(username, password, cb) {
    Usuario.findOne({ userName: username }, function (err, user){
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));
*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    var d = new Date();
    var xx = d.getTime();
    cb(null, file.originalname+xx+".webm")
  }
})

var upload = multer({ storage: storage  })
var upload2 = multer({ storage: storage2  })

//var upload = multer({ dest: 'uploads/' })


router.use(function(req,res,next){
  console.log('>> api');
  console.log("request");
  next();
})



router.get('/', function(req, res){
     res.json({message: 'Bienvenido a nuestra api pG'});
  });



// CREA UN producto //
router.route('/producto')
    .post( function(req, res){
      console.log('en ruta');
      console.log(req.body);
      var producto = new Producto();
                  producto.nombre = req.body.nombre;
                  producto.categoria = req.body.categoria;
                  producto.subCategoria = req.body.subcategoriaID;
                  producto.precio = req.body.precio;
                  producto.descripcion = req.body.descripcion;
                  producto.tamanio = req.body.precio;
                  producto.noHojas = req.body.noHojas;
                  producto.cuadricula = req.body.cuadricula;
                  producto.cantidad = req.body.cuadricula;
                  /***mampInicio****/
                  producto.save(function(err,rest){
                    if(err){
                      res.send("Error al guardar el producto"+err);
                    }else {
                     console.log("guardado el producto");
                    }
                  });

      res.json('producto guardado');

   })
   .get( function(req, res){
     console.log('en ruta');
     Producto.find(function (err, curso){
          if(err){
            res.send(err);
            console.log('errooorr');
          }
          res.json(curso);


  })
});

// CREA UN producto //
router.route('/categoria')
    .post( function(req, res){
      console.log('en ruta');
      console.log(req.body);
      var categoria = new Categoria();
                  categoria.nombreCategoria = req.body.nombreCategoria;
                  categoria.categoriaID = req.body.categoriaID;
                  var arreglo2 = [];
                for (var i = 0; i < req.body.nombreSubCategoria.length; i++) {
                  var arregloSub = {nombreSubCategoria: req.body.nombreSubCategoria[i], subcategoriaID: req.body.subcategoriaID[i]};
                  arreglo2.push(arregloSub);
                }
                  categoria.subcategoria = arreglo2;
                  /*console.log(req.body);
                  console.log('arreglo');
                  console.log(arregloSub);
                  console.log('arreglo2 ');
                  console.log(arreglo2);*/
                  /*producto.categoria = req.body.categoria;
                  producto.precio = req.body.precio;
                  producto.descripcion = req.body.descripcion;
                  producto.tamanio = req.body.precio;

                  /***mampInicio****/
                  categoria.save(function(err,rest){
                    if(err){
                      res.send("Error al guardar el producto"+err);
                    }else {
                     console.log("guardada categoria");
                    }
                  });

      res.json('categoria');

   });
   router.route('/categoria/:id')
   .get( function(req, res){
     console.log('en ruta');

     Categoria.find({"categoriaID": req.params.id,}, function(err, categoria){
           if(err){
            res.send(err);
            console.log('errooorr');
          }
          res.json(categoria);

      });

  });


  router.route('/lista')
      .post( function(req, res){
        console.log('en ruta');
        console.log(req.body);
        var lista = new Lista();
        console.log(req.body.productos);
                    /*lista.idEtapa = req.body.idEtapa;
                    lista.idGrado = req.body.idGrado;
                    var arreglo2 = [];
                    var arregloSub = {nombreProducto: req.body.nombreProducto[0], descripcionProducto: req.body.descripcionProducto[0], categoriaProducto: req.body.categoriaProducto[0], subcategoriaID: req.body.subcategoriaID[0], precioProducto:req.body.precioProducto[0] };


                    arreglo2.push(arregloSub);
                    categoria.subcategoria = arreglo2;
                    //console.log(req.body);
                    console.log('arreglo');
                    console.log(arregloSub);
                    console.log('arreglo2 ');
                    console.log(arreglo2);
                    /*producto.categoria = req.body.categoria;
                    producto.precio = req.body.precio;
                    producto.descripcion = req.body.descripcion;
                    producto.tamanio = req.body.precio;

                    /***mampInicio****/
                  /*  categoria.save(function(err,rest){
                      if(err){
                        res.send("Error al guardar el producto"+err);
                      }else {
                       console.log("guardada categoria");
                      }
                    });
         */
        res.json('categoria');

     });
     /*router.route('/lista/:id')
     .get( function(req, res){
       console.log('en ruta');

       Categoria.find({"categoriaID": req.params.id,}, function(err, categoria){
             if(err){
              res.send(err);
              console.log('errooorr');
            }
            res.json(categoria);

        });

    });*/



router.route('/categoria')
.get( function(req, res){
  Categoria.find({}, function(err, categoria){
        if(err){
         res.send(err);
         console.log('errooorr');
       }
       res.json(categoria);

   });
});


// LOGUEO usuario
/*router.route('/usuarioLog')
    .post( function(req, res){
      console.log('en ruta');
      console.log(req.body);
      console.log(req.params);

                  Usuario.find({ $and: [ { correo: req.body.correo }, { pass: req.body.pass } ] }  ,function(err,usuario){
                    if(err){
                      res.send("Error al logueo el usuario"+err);
                    }
                    res.json(usuario);
                  });



   })

   // LOGUEO usuario
   router.route('/usuarioOne/:id')
       .get( function(req, res){
         console.log('en ruta');
         console.log(req.body);
         console.log(req.params);

                     Usuario.find({ _id: req.params.id }  ,function(err,usuario){
                       if(err){
                         res.send("Error al logueo el usuario"+err);
                       }
                       res.json(usuario);
                     });



      })


*/

  router.route('/uploads/:id')
    .post(upload.array('pim'), function(req, res){
      console.log("uploads");
      console.log(req.params.id);
      f = req.files.length;
      for (var i = 0; i < f; i++) {
      Producto.update({_id: req.params.id },{ $push: { "imagenes": req.files[i].originalname } } , function (err, resta){
       if(err){
         res.send(err);
         console.log('errooorr');
       }
  });
   }
   res.json("Correcto")

    })

    /*

    router.route('/uploadvideo/:id')
      .post(upload2.array('pim'), function(req, res){
        //console.log(req);
        console.log(req.files);
        //console.log(req.file.pim);
        console.log(req.params.id);
        f = req.files.length;
        for (var i = 0; i < f; i++) {
        Usuario.update({_id: req.params.id },{ $set: { "video": req.files[i].filename } } , function (err, resta){
         if(err){
           res.send(err);
           console.log('errooorr');
         }
    });
     }
     res.json("Correcto")

      })

      router.post('/submit_record', (req, res) => {
        req.pipe(fs.createWriteStream('uploads/myFile.webm'))
          .on('error', (e) => res.status(500).end(e.message))
          .on('close', () => res.end('File saved'))
      })

      router.route('/upload/:id')
        .post(upload.single('avatar'), function(req, res){
          //console.log(req.file.pim);
          console.log(req.params.id);
          //f = req.files.length;
          //for (var i = 0; i < f; i++) {
          Curso.update({_id: req.params.id },{ $push: { "imagenes": req.file.originalname } } , function (err, resta){
           if(err){
             res.send(err);
             console.log('errooorr');
           }
      });
       //}
       res.json("Correcto")

        })




router.route('/downloadI/:id')
.get( function(req, res){

Curso.find({_id:req.params.id} ,function (err, curso){
   if(err){
    console.log('errooorr');
     res.send(err);
   }
   console.log(curso);
   v = curso.length;
   console.log(v);
   var sendarch;
   for (var i = 0; i < v; i++) {
     archivos = curso[i].imagenes;
     for (var i = 0; i < archivos.length; i++) {
          console.log(archivos[i]);
          archivos[i] = 'http://138.68.7.40:8050/static/' + "" +archivos[i];
        // console.log("file: "+file);
         //res.download(file);
         //res(file)

     } //for1
   }
     res.json({archivos});
  //maquina.find
 });

//var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
//res.download(file);


}) //download2


*/


module.exports = router;
