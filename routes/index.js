var express = require('express');

var mongoose = require('mongoose');

//var Incidencia= require('../app/models/maquina');
var Curso = require('../app/models/curso');
var Usuario = require('../app/models/usuario');

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
  console.log(req);
  next();
})



router.get('/', function(req, res){
     res.json({message: 'Bienvenido a nuestra api'});
  });


/*router.route('/login')
     .get( passport.authenticate('basic', { session: false }), function(req,res){
       res.json(req.user)
    })
*/

/*router.route('/encuentra/:id')
.get( function(req,res){
    console.log("get encuentra maquina");
    console.log("ident");
    console.log(req.params.id);
    Maquina.find({"modelo": req.params.id}, function (err, maquina){
     if(err)
       res.send(err);

     res.json(maquina);
     console.log(maquina);
   });
    });

*/

// CREA UN CURSO SIN IMAGENES //
router.route('/curso')
    .post( function(req, res){
      console.log('en ruta');
      console.log(req.body);
      console.log(req.params.id);
      var curso = new Curso();
                  curso.nombre = req.body.nombre;
                  curso.lenguaje = req.body.lenguaje;

                  /***mampInicio****/
                  curso.save(function(err,rest){
                    if(err){
                      res.send("Error al guardar el curso"+err);
                    }else {
                     console.log("guardado el curso");
                    }
                  });

      res.json('curso guardado');

   })
   .get( function(req, res){
     console.log('en ruta');
     Curso.find(function (err, curso){
          if(err){
            res.send(err);
            console.log('errooorr');
          }
          res.json(curso);


  })
});


// CREA UN usuario  //
router.route('/usuario')
    .post( function(req, res){
      console.log('en ruta');
      console.log(req.body);
      console.log(req.params.id);
      var usuario = new Usuario();
                  usuario.nombre = req.body.nombre;
                  usuario.pass = req.body.pass;

                  /***mampInicio****/
                  usuario.save(function(err,rest){
                    if(err){
                      res.send("Error al guardar el usuario"+err);
                    }else {
                     console.log(" usuario guardado ");
                    }
                  });

      res.json('usuario guardado');

   })
   .get( function(req, res){
     console.log('en ruta');
     Usuario.find(function (err, usuario){
          if(err){
            res.send(err);
            console.log('errooorr');
          }
          res.json(usuario);


  })
});



/*router.route('/upload/:id')
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
*/
  router.route('/uploads/:id')
    .post(upload.array('pim'), function(req, res){
      console.log("uploads");
      console.log(req.params.id);
      f = req.files.length;
      for (var i = 0; i < f; i++) {
      Curso.update({_id: req.params.id },{ $push: { "imagenes": req.files[i].originalname } } , function (err, resta){
       if(err){
         res.send(err);
         console.log('errooorr');
       }
  });
   }
   res.json("Correcto")

    })

    router.route('/uploadvideo/:id')
      .post(upload2.array('pim'), function(req, res){
        //console.log(req);
        console.log(req.files);
        //console.log(req.file.pim);
        console.log(req.params.id);
        f = req.files.length;
        for (var i = 0; i < f; i++) {
        Usuario.update({_id: req.params.id },{ $push: { "video": req.files[i].filename } } , function (err, resta){
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

  /*router.route('/download/:id/:nombre')
  .get( function(req, res){

  Maquina.find({_id:req.params.id} ,function (err, maquina){
     if(err){
      console.log('errooorr');
       res.send(err);
     }
     v = maquina.length;
     console.log(v);
     for (var i = 0; i < v; i++) {
       archivos = maquina[i].manuales;
       for (var i = 0; i < archivos.length; i++) {
         if (archivos[i] == req.params.nombre) {
           file = '/home/marco/Documentos/uni/proyectos_2/server/uploads/' + "" +archivos[i];
           console.log("file: "+file);
           //res.download(file);
           //res(file)
           fs.readFile(file, function (err,data){
          res.contentType("application/pdf");
          res.send(data);
        }); //fs


         }//if
       } //for
    }


   });



}) //download

*/


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
          archivos[i] = 'http://localhost:8050/static/' + "" +archivos[i];
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









router.route('/downloadf/:id')
.get( function(req, res){

Maquina.find({_id:req.params.id} ,function (err, maquina){
   if(err){
    console.log('errooorr');
     res.send(err);
   }
   console.log(maquina);
   v = maquina.length;
   console.log(v);
   var sendarch;
   for (var i = 0; i < v; i++) {
     archivos = maquina[i].manuales;
     for (var i = 0; i < archivos.length; i++) {
          archivos[i] = '/home/marco/Documentos/uni/proyectos_2/server/uploads/' + "" +archivos[i];
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


   // NUEVOCAMBIO 2 AGREGADA RUTA
   /// >>> ELIMINA LA MAQUINA   <<<
   router.route('/maquinaDelate/:id')
   .post( function(req, res){
     console.log('en ruta');
     console.log(req.body);
     console.log(req.params.id);

     Maquina.remove({_id: req.params.id }, function (err, maquina){
      if(err){
        res.send(err);
        console.log('errooorr');
      }

    console.log(maquina);
  });

     res.json('todo bueno');

  });

  // ELIMINA PDF
  router.route('/pdfElimina/:id')
  .post( function(req, res){
    console.log('en ruta');
    console.log(req.body);
    console.log(req.params.id);
    Maquina.update({_id: req.params.id },{ $pull: { "manuales": req.body.manual  } }, { safe: true },  function (err, resta){
     if(err){
       res.send(err);
       console.log('errooorr');
     }

   console.log(resta);
  });

    res.json('todo bueno');

  });



module.exports = router;
